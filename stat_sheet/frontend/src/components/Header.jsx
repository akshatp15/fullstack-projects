function Header() {
  return (
    <header className="w-full border-b border-gray-700 bg-orange-600 shadow-md">
      <div className="w-full px-8 py-4">
        <button
          onClick={() => window.location.reload()}
          className="text-2xl font-bold text-white transition hover:text-blue-200"
        >
          Stat Sheet
        </button>
      </div>
    </header>
  )
}

export default Header
