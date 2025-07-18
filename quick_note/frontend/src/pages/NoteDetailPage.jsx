import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react'

const NoteDetailPage = () => {
  // State variables
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Variable to store useNavigate function
  const navigate = useNavigate()

  // Getting the id from the url
  const {id} = useParams()
  
  // Function to run when id changes
  useEffect(() => {
    const fetchNote = async() => {
      try{
        // Get the note specified by the user from the db using the backend
        const res = await api.get(`/notes/${id}`)
        // set note variable to be the object returned by the backend
        setNote(res.data)
      } 
      catch(error){
        // Error handling and sending message to user of failure
        console.log("Error", error)
        toast.error("Failed to get note")
      } 
      finally{
        // reset loading variable to false
        setLoading(false)
      }
    }
    fetchNote() // Call the fetchNote function defined above
  }, [id])
  
  // Function to handle the deletion of the note
  const handleDelete = async () => {
    // Confirming with user if they wish to delete this note
    if(!window.confirm("Are you sure you want to delete this note?")) return
    try {
      // Delete note from db using backend
      await api.delete(`/notes/${id}`)

      // Send user a confirmation message
      toast.success("Note deleted successfully")

      // Send the user back to the homepage
      navigate("/")

    } 
    catch(error){
      // Error handling and sending user failure message
      console.log("Error deleting the note:", error)
      toast.error("Failed to updating note")
    }
  }

  // Function to handle the update of a note
  const handleSave = async () => {
    // Check user has entered both a title and content for the note
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title and content")
      return
    }

    // set saving variable to true 
    setSaving(true)

    try {
      // Update the note using the backend
      await api.put(`/notes/${id}`, note)

      // Send user success message
      toast.success("Note updated successfully")

      // Send user back to the home page
      navigate("/")
    } 
    catch(error){
      // Error handling and sending user a failure message
      console.log("Error updating the note:", error)
      toast.error("Failed to delete note")
    }
    finally{
      // reset the saving variable to false
      setSaving(false)
    }
    
  }

  // If loading is true then display a spinning wheel
  if(loading) {
    return (<div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10'></LoaderIcon>
    </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container max-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Notes
              </Link>
              <button onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
          </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'></span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage