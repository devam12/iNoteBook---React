require('dotenv').config();
const express = require('express')
const router = express.Router();
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const verifyUser = require("../middleware/verifyUser");

//Get All Notes
router.get("/getAllNotes", verifyUser, async (req, res) => {
    try {
        let notes = await Notes.find({user : req.id});
        res.send(notes);
    }
    catch (err) {
        res.status(500).send(err)
    }
})

//Add Note
router.post("/addnote", verifyUser, 
    [
        body('title', "Enter valid Title").isLength({ min: 3 }), 
        body('description', 'Enter valid description').isLength({ min: 5 })
    ] , async (req, res) => {
    try {
        //check validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //find if user not registered 
        let {title, description,tag} = req.body;

        //Save to Database
        let note = new Notes({
            title, description,tag , user : req.id,
        });
        let saveNote = await note.save()

        //send Responce
        res.status(200).send( saveNote );
    }
    catch (err) {
        res.status(500).send(err)
    }
})


//Update Note
router.put("/updateNote/:id", verifyUser,  async (req, res) => {
    try {
        //Get updated data 
        let {title, description,tag} = req.body;

        //Create Updated Note
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find Note it exist or note
        const note = await Notes.findById(req.params.id);
        
        if(!note){
            return res.status(400).send({error : "Note not found"})
        }

        //Check Note is changes on login user
        if(note.user.toString() !== req.id ){
            return res.status(401).send({error : "Not allowed"}) 
        }

        //Update Note
        let updatednote = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});

        //send Responce
        res.status(200).send({ updatednote });
    }
    catch (err) {
        res.status(500).send(err)
    }
})



//Update Note
router.delete("/deletenote/:id", verifyUser,  async (req, res) => {
    try {
        //Find Note it exist or note
        const note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(400).send({error : "Note not found"})
        }

        //Check Note is changes on login user
        if(note.user.toString() !== req.id ){
            return res.status(401).send({error : "Not allowed"}) 
        }

        //Update Note
        let deletednote = await Notes.findByIdAndDelete(req.params.id);

        //send Responce
        res.status(200).send(deletednote);
    }
    catch (err) {
        res.status(500).send(err)
    }
})



module.exports = router;

