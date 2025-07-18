import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  // State variables
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  // Function to run on loading
  useEffect(() => {
    const fetchNotes = async () => {
      try{
        // Get the notes from the backend
        const res = await api.get("/notes")
        
        // set the notes variable to the json data fetched from the backend
        setNotes(res.data)

        // set the isRateLimited variable to false
        setIsRateLimited(false)
      } 
      catch(error){
        // Error handling
        console.log("error fetching notes")

        // Check if user is rate limited
        if(error.response?.status == 429){
          setIsRateLimited(true)
        }
        // If not then send user error message
        else{
          toast.error("Failed to load notes")
        }
      } 
      finally {
        // Reset loading variable to false
        setLoading(false)
      }
    }
    fetchNotes() // Call the fetchNotes function defined above
  }, [])
  
  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => {
              return <NoteCard key={note._id} note={note} setNotes={setNotes} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage