const connectToDatabse = require('./db');
const express = require('express')
require('dotenv').config();
const auth = require("./routes/auth")
const notes = require("./routes/notes")
var cors = require('cors')
 

const app = express()
app.use(cors())
connectToDatabse();

//Available Routes
app.use(express.json());
app.use("/api/auth" , auth)
app.use("/api/notes" , notes)


//Start Application 
app.listen(4000, ()=>{
    console.log("Example app listing at http://localhost:4000");
})
