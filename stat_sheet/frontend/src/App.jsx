import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import PlayerSearch from './components/Search.jsx'
function App() {
  const [players, setPlayers] = useState({}) 
  const [search, setSearch] = useState('') 
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000')
        const data = await res.json()

        setPlayers(data)
      } 
      catch (error) {
        console.log('Error fetching players:', error)
      }
    }

    fetchPlayers()
  }, [])

  return (
    <>
      <Header />

      <PlayerSearch players={players} search={search} setSearch={setSearch} setSelectedPlayer={setSelectedPlayer} /> 

      <h1>HELLO</h1>

      <p>Players loaded: {selectedPlayer}</p>
    </>
  )
}

export default App
