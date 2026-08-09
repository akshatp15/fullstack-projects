import PlayerSearch from './Search'

function Header(props) {
  const {
    players,
    search,
    setSearch,
    setSelectedPlayer
  } = props

  return (
    <header className="w-full border-b border-gray-700 bg-orange-600 shadow-md">
      <div className="flex items-center gap-8 px-4 py-4 md:px-8">

        <button
          onClick={() => window.location.reload()}
          className="shrink-0 text-2xl font-bold text-white transition hover:text-blue-200"
        >
          Stat Sheet
        </button>

        <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl">
          <PlayerSearch
            players={players}
            search={search}
            setSearch={setSearch}
            setSelectedPlayer={setSelectedPlayer}
          />
        </div>

      </div>
    </header>
  )
}

export default Header

