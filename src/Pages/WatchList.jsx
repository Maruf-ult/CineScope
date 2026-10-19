import React from 'react'
import { useMovie } from '../context/movieContext'
import MovieCard from '../components/MovieCard'

const WatchList = () => {
  const { favourites } = useMovie()

  return (
    <div className="flex  items-start justify-center pt-20 gap-2 ">
      {favourites.length === 0 ? (
        <div className="flex flex-col gap-2 items-center pt-40 justify-center text-black ">
          <h1 className='text-2xl font-bold text-gray-600'>No Wathclist Yet</h1>
          <p className='font-light'>Try adding some movies for your watchlist</p>

        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-gray-700 text-2xl">My Watchlist</h1>
              <p className="font-semibold text-gray-500">
                Your favourite movies, always at hand
              </p>
            </div>

            <h1 className="bg-gray-200 text-black text-center h-full p-2 rounded-sm ">
              {favourites.length} Movies
            </h1>
          </div>
          <div className=" grid grid-cols-5 gap-4 ">
            {favourites?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WatchList
