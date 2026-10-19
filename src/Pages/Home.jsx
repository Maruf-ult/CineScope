import SearchBox from '../components/SearchBox'
import homeImage from '../assets/homeImage.png'
import { useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from '../services/MovieApi'
import { MoveRight } from 'lucide-react'
import MovieCard from '../components/MovieCard'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewAll,setViewAll] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const allMovies = await getPopularMovies()
        setMovies(allMovies)
        console.log(allMovies)
      } catch (error) {
        console.log(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, [])

  if (loading) {
    return (
      <div className="pt-30 flex items-center justify-center text-center bg-gray-500">
        <p>Loading....</p>
      </div>
    )
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center pt-20  justify-start ">
      <div className="flex items-start justify-center gap-20 pt-1  ">
        <div className="flex flex-col gap-6">
          <h3 className="text-black text-4xl font-bold">
            Discover your <br /> next favourite movie
          </h3>
          <p className="font-light">
            Explore thousands of movies, search by title, filter by genre <br />
            and build your personal wathcList.
          </p>
          <SearchBox Position="middle" />
        </div>
        <div className="">
          <img className="h-78" src={homeImage} alt="authimage" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold text-xl text-black">Popular Movies</h1>

          <div onClick={()=>setViewAll(!viewAll)} className="flex items-center justify-center text-center gap-0.5 cursor-pointer font-bold">
            <p className="text-blue-500  hover:text-blue-400 transition-colors">{viewAll?"View All":"Show Less"}</p>
            <MoveRight className="text-blue-700  " size={20} />
          </div>
        </div>

        {viewAll?( <div className="grid grid-cols-5 gap-4 ">
          {movies?.slice(0,5).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>):( <div className="grid grid-cols-5 gap-4 ">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>)}

      </div>
    </div>
  )
}

export default Home
