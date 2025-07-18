import Note from "../models/Note.js"

// Function to handle getting all the notes from the db
export async function getAllNotes(req, res) {
    try {
        // Getting all notes from db
        const notes = await Note.find().sort({createdAt: -1})//newest first

        // Send notes and 200 OK if successful to client
        res.status(200).json(notes)
    } 
    catch(error){
        // Error handling, send 500 status code and message to client
        res.status(500).json({message:"Internal Server Error"})
    }
}

// Function to handle getting specific note from db
export async function getNoteById(req, res) {
    try {
        // Getting the specific note from the db
        const note = await Note.findById(req.params.id)

        // Handles case where specific note doesn't exist in db
        if(!note){
            return res.status(404).json({message:"Note not found"})
        }

        // Send note and 200 OK if successful to client
        res.status(200).json(note)
    } 
    catch(error){
        // Error handling, send 500 status code and message to client
        console.log("Error in getNoteById controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

// Function to handle creating notes
export async function createNote(req, res){
    try{
        // Get the user specified title and content from requests body
        const {title, content} = req.body

        // Create new note to be stored into the db
        const note = new Note({title:title, content:content})

        // Saving the note to the db
        const savedNote = await note.save()

        // Send saved note and 201 CREATED if successful to client
        res.status(201).json(savedNote)
    } 
    catch(error){
        // Error handling, send 500 status code and message to client
        console.log("Error in createNote controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

// Function to handle updating notes
export async function updateNote(req, res){
    try{
        // Get the user specified title and content from requests body
        const {title, content} = req.body

        // Update note with user specified title and content
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title, content}, {new: true})
        // Handles case where specific note doesn't exist in db
        
        if(!updatedNote) {
            return res.status(404).json({message:"Note not found"})
        }
        // Send message and 200 OK if successful to client
        res.status(200).json({message:"Note updated successfully"})
    }
    catch(error){
        // Error handling, send 500 status code and message to client
        console.log("Error in updateNote controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

// Function to handle deleting notes
export async function deleteNote(req, res){
    try{
        // Delete user specified note from db
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        // Handles case where specific note doesn't exist in db
        if(!deletedNote) {
            return res.status(404).json({message:"Note not found"})
        }

        // Send message and 200 OK if successful to client
        res.status(200).json({message:"Note deleted successfully"})
    }
    catch(error){
        // Error handling, send 500 status code and message to client
        console.log("Error in deleteNote controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
}