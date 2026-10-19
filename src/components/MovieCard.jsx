import { StarIcon } from 'lucide-react'
import React from 'react'

const MovieCard = ({ movie }) => {
  return (
    <div className="flex flex-col items-start justify-center cursor-pointer bg-white shadow-2xl rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-40 rounded-t-lg"
      />{' '}
      <div className='flex flex-col gap-2 p-2'>
        <p className="text-gray-700 font-bold text-sm">{movie.title}</p>
      <p className='text-sm font-light'>{movie.release_date.split('-')[0]}</p>
      <div className="flex gap-1">
        <StarIcon className=" text-yellow-400" size={20} />
        <p className="text-gray-600 font-bold text-sm">{movie.vote_average}</p>
      </div>
      </div>
    
    </div>
  )
}

export default MovieCard
