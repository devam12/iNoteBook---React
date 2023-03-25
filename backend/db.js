const mongoose = require('mongoose');

const connectToDatabse = async () => {
    try{
        await mongoose.connect("mongodb+srv://devampanchasara:devam@cluster0.fy63oxu.mongodb.net/inotebook");
        console.log("Database Connected");
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectToDatabse
