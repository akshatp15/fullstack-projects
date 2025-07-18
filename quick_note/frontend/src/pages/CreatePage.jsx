import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios'

const CreatePage = () => {
  // State variables
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  // Variable use to allow for page navigation
  const navigate = useNavigate();

  // Function to handle the creation of a new note
  const handleSubmit = async (e) => {
    // Prevent the default behaviour of clearing the fields
    e.preventDefault()

    // Check if user has entered both a title and content for the new note
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required")
      return
    }

    // set loading state to true
    setLoading(true)

    try{
      // Post the new note to db using the backend
      await api.post("/notes", {
        title,
        content
      })

      // Provide success message to user
      toast.success("Note created successfully")

      // Navigate the user back to the home page 
      navigate("/")

    } 
    catch(e){
      // Error handling
      console.log("Error creating note", e)

      // Handle case where user is rate limited 
      if(e.response.status === 429) {
        toast.error("Please create notes slower! Server Overload")
      }
      // If user isn't rate limited then provide a failure message
      else{
        toast.error("Failed to create note")
      }
    } finally{
      // Reset loading variable
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-y py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'></ArrowLeftIcon>
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" placeholder='Note Title' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                </div>

                <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                </div>

                <div className='card-actions justify-end'>
                  <button type="sumbit" className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating..." :"Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage