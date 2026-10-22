import SearchBox from '../components/SearchBox'
import homeImage from '../assets/homeImage.png'
import { useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from '../services/MovieApi'
import { MoveRight, X } from 'lucide-react'
import MovieCard from '../components/MovieCard'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewAll, setViewAll] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')?.trim() || ''

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        if (searchQuery) {
          const results = await searchMovies(searchQuery)
          setMovies(results)
          setViewAll(false)
        } else {
          const results = await getPopularMovies()
          setMovies(results)
          setViewAll(true)
        }
      } catch (error) {
        console.error(error)
        setError(error.message || 'Failed to load movies')
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [searchQuery])

  const clearSearch = () => {
    setSearchParams({})
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center pt-20  justify-start ">
      <div className="flex items-start justify-center lg:gap-50 md:gap-20  md:pt-10  ">
        <div className="flex flex-col   gap-5  p-4 sm:p-0 md:gap-6 md:ml-4 ">
          <h3 className="text-black text-3xl md:text-4xl font-bold">
            Discover your <br /> next favourite movie
          </h3>
          <p className="font-light  ">
            Explore thousands of movies, search by title, filter by genre <br className='hidden  lg:inline' />
            and build your personal wathcList.
          </p>
          <SearchBox Position="middle" />
        </div>
        <div className="hidden md:block">
          <img className=" h-60 w-full " src={homeImage} alt="authimage" />
        </div>
      </div>
      <div className=" w-full max-w-6xl px-4 flex  flex-col gap-4 mt-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold text-xl text-black">Popular Movies</h1>

          <div className="flex items-center gap-4">
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              >
                <X size={16} />
                <span>Clear Search</span>
              </button>
            )}
          </div>

          <div
            onClick={() => setViewAll(!viewAll)}
            className="flex items-center justify-center text-center gap-0.5 cursor-pointer font-bold"
          >
            <p className="text-blue-500  hover:text-blue-400 transition-colors">
              {viewAll ? 'View All' : 'Show Less'}
            </p>
            <MoveRight className="text-blue-700  " size={20} />
          </div>
        </div>

        {loading && <p>Loading....</p>}
        {error && <p>{error}</p>}
        {!loading && !error && movies?.length === 0 && (
          <p className="text-gray-500 py-6">
            No movies found. Try another title.
          </p>
        )}
        {viewAll ? (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 ">
            {movies?.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
