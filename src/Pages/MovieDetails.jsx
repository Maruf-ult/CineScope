
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails } from '../services/MovieApi'
import { Heart, MoveLeft, Plus, StarIcon } from 'lucide-react'
import { useMovie } from '../context/movieContext'
import { useUser } from '../context/AuthContext'

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const { addToFavourites, isFavourite } = useMovie()
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        setLoading(true)
        setError(null)

        const movieInfo = await getMovieDetails(id)
        setMovie(movieInfo)
      } catch (error) {
        console.error(error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getMovieInfo()
  }, [id])

  const favourite = isFavourite(id)

  const handleAddFavourite = () => {
    if (user) {
      if (!favourite) {
        addToFavourites(movie)
      }
    } else {
      navigate('/auth')
    }
  }

  const convertTime = (time) => {
    if (!time) return 'N/A'

    const hour = Math.floor(time / 60)
    const min = time % 60

    return `${hour}h ${min}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-600">Loading movie details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-500 text-center">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:underline"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10">
  
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 font-semibold cursor-pointer
                   hover:text-blue-500 transition-colors mb-6"
      >
        <MoveLeft className="text-blue-500" size={18} />
        <span>Back to Home</span>
      </button>

   
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-10">
     
        <div className="w-full md:w-2/5 lg:w-1/3 shrink-0">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ''
            }
            alt={movie.title || 'Movie poster'}
           className="w-full max-w-xs mx-auto md:max-w-none h-64 sm:h-72 md:h-122 object-fill rounded-md shadow-md"
          />
        </div>

       
        <div className="flex flex-col gap-4 w-full min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 wrap-break-word">
            {movie.title}
          </h1>

   
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
            <p className="text-sm">
              {movie.release_date?.split('-')[0] || 'N/A'}
            </p>

            <p className="text-sm">
              {convertTime(movie.runtime)}
            </p>

            <p className="text-sm">
              {movie.vote_count ?? 0} votes
            </p>
          </div>

     
          <div className="flex flex-wrap items-center gap-2">
            <StarIcon className="text-yellow-400 shrink-0" size={20} />

            <p className="text-gray-600 font-bold text-sm">
              {movie.vote_average?.toFixed(1) ?? 'N/A'}/10
            </p>

            <p className="text-sm text-gray-500">
              ({movie.vote_count ?? 0} votes)
            </p>
          </div>

  
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="text-blue-500 bg-blue-100 text-sm font-semibold
                           rounded-md px-2 py-1"
              >
                {genre.name}
              </span>
            ))}
          </div>

 
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {movie.overview || 'No overview available.'}
          </p>


          {movie.production_companies?.length > 0 && (
            <div className="flex flex-col gap-3 mt-2">
              <h2 className="font-semibold text-gray-800">
                Production Companies
              </h2>

              {movie.production_companies.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm"
                >
                  <p className="text-gray-700">{company.name}</p>

                  {company.origin_country && (
                    <p className="text-gray-500">
                      {company.origin_country}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

      
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <button
              onClick={handleAddFavourite}
              disabled={favourite}
              className={`flex items-center justify-center gap-2 rounded-md
                         px-4 py-2 text-sm sm:text-base text-white
                         transition-colors ${
                           favourite
                             ? 'bg-blue-400 cursor-not-allowed'
                             : 'bg-blue-500 hover:bg-blue-400 cursor-pointer'
                         }`}
            >
              <Plus size={18} />
              {favourite ? 'Added to Watchlist' : 'Add to Watchlist'}
            </button>

  
            <button
              type="button"
              aria-label={favourite ? 'Movie is a favourite' : 'Favourite status'}
              className="flex items-center justify-center rounded-md
                         bg-gray-200 hover:bg-gray-100 p-3 transition-colors"
            >
              <Heart
                size={18}
                color={favourite ? 'red' : 'black'}
                fill={favourite ? 'red' : 'white'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
