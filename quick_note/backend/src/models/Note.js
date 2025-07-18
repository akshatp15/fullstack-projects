import mongoose from "mongoose"

// 1st step - create a schema
// 2nd step- model based off of that schema

// Schema/Model for each object in the db
const noteSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content: {
        type:String,
        required: true
    }
}, {timestamps: true} )

// Creating the model/db using the schema
const Note = mongoose.model("Note", noteSchema)

export default Note