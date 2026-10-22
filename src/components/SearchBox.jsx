
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const SearchBox = ({ Position }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      navigate('/')
      return
    }

    navigate(`/?search=${encodeURIComponent(trimmedQuery)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-3 bg-gray-200 h-10 rounded-sm  md:w-full w-80 overflow-hidden"
    >
      <input
        className="w-full bg-transparent outline-none pl-3 text-sm"
        type="text"
        placeholder="Search Movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        type="submit"
        className={`flex items-center justify-center h-full px-3 shrink-0 cursor-pointer transition-colors ${
          Position === 'top'
            ? 'text-gray-600 hover:text-gray-800'
            : 'text-white bg-blue-500 hover:bg-blue-600'
        }`}
        aria-label="Search movies"
      >
        <Search size={16} />
      </button>
    </form>
  )
}

export default SearchBox
