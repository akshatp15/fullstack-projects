import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import {formatDate} from "../lib/utils"
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {
    // Function that handles the deletion of a note
    const handleDelete = async (e, id) => {
        // Prevent the default behaviour of linking to the NoteDetailPage
        e.preventDefault()

        // Confirming that user does want to delete the note
        if (!window.confirm("Are you sure you would like to delete this note")){
            return
        }

        try{
            // Make request to backend to delete the note
            api.delete(`/notes/${id}`)

            // Re-render the notes after the deletion
            setNotes((prev) => prev.filter((note) => note._id !== id)); 

            // Send user a success message
            toast.success("Note deleted successfully")
        } 
        catch(error){
            // Error handling
            console.log("Error in handleDelete", error)
            toast.error("Failed to delete the note")
        }
    }
    
    return (
        <Link to={`/note/${note._id}`} className='className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"'>
            <div className='card-body'>
                <h3 className='card-title text-base-content'>{note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className='flex items-centergap-1'>
                        <PenSquareIcon className='size-4' />
                        <button className='btn btn-ghost btn-xs text-error'>
                            <Trash2Icon className='size-4' onClick={(e) => handleDelete(e, note._id)}/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard