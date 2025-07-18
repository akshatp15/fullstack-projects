import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js"

// Creating a router to handle the routes
const router = express.Router()

// Use the getAllNotes function to handle GET requests to http://localhost:5001/api/notes
router.get("/", getAllNotes)
// Use the getNoteById function to handle GET requests to http://localhost:5001/api/notes/id
router.get("/:id", getNoteById)
// Use the createNote function to handle POST requests to http://localhost:5001/api/notes
router.post("/", createNote)
// Use the updateNote function to handle PUT requests to http://localhost:5001/api/notes/id
router.put("/:id", updateNote)
// Use the deleteNote function to handle DELETE requests to http://localhost:5001/api/notes/id
router.delete("/:id", deleteNote)

export default router