require('dotenv').config();
const express = require('express')
const router = express.Router();
const User = require("../models/Users")
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const verifyUser = require("../middleware/verifyUser");


//Register
router.post("/register", [body('name', "Enter valid name").isLength({ min: 3 }), body('email', 'Enter valid email').isEmail(), body('password', "Enter greater then 5 length password").isLength({ min: 5 })], async (req, res) => {
    try {
        //check validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //find if user not registered 
        let data = req.body;
        let user = await User.findOne({ email: data.email });
        if (user) {
            return res.send({ exist: true, message: "User already registered" });
        }

        //Password hasing
        var salt = await bcrypt.genSaltSync(10);
        var hashPassword = await bcrypt.hashSync(data.password, salt);

        //Save to Database
        user = User({
            name: data.name,
            email: data.email,
            password: hashPassword,
        });
        user.save()

        //Generate Token
        var token = jwt.sign(user.id, process.env.JWT_SECRET);

        //send Responce
	let success = true;
        res.status(200).send({ success , token });
    }
    catch (err) {
        res.status(500).send(err)
    }
})

//Login
router.post("/login", [body('email', 'Enter valid email').isEmail(), body('password', "Enter password").isLength({ min: 0 })], async (req, res) => {
    try {
        //check validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

	console.log("Login");

        //find if user registered or not 
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ exist: false, message: "Enter valid username & password" });
        }

        //Check Password
        var passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(400).send({ exist: false, message: "Enter valid username & password" });
        }

        //Generate token for login user
        var token = jwt.sign(user.id, process.env.JWT_SECRET);

        //send Responce
	let success = true;
        res.status(200).send({ success ,token , user});
    }
    catch (err) {
        res.status(500).send(err)
    }
})


//Login
router.post("/getUser", verifyUser, async (req, res) => {
    try {
        let user = await User.findById(req.id).select("-password");
        res.send(user);
    }
    catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;

