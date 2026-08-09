function PlayerSearch(props){
  const {players, search, setSearch, setSelectedPlayer} = props
  const filteredPlayers = Object.entries(players).filter(
    ([id, name]) =>
      name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for a player..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />

      {search && (
        <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map(([id, name]) => (
              <button
                key={id}
                onClick={() => {
                  setSelectedPlayer(id)
                  setSearch('')
                }}
                className="block w-full px-4 py-3 text-left text-gray-800 transition hover:bg-blue-50 hover:text-blue-600"
              >
                {name}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-gray-500">
              No players found
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default PlayerSearch

