import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import PlayerSearch from './components/Search.jsx'
import Table from './components/Table.jsx'

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
      <Header players={players} search={search} setSearch={setSearch} setSelectedPlayer={setSelectedPlayer} />

      <Table selectedPlayer={selectedPlayer} name={players[selectedPlayer]} />
    </>
  )
}

export default App
