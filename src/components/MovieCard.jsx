import { Heart, StarIcon } from 'lucide-react'
import { useMovie } from '../context/movieContext'
import { useState } from 'react';
import { useUser } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {

   
  const {addToFavourites,removeFromFavourites,isFavourite} = useMovie();
  const {user} = useUser();
  const navigate = useNavigate();

  const favourite = isFavourite(movie.id);
  
  const handleFavourites = (movie) =>{
    if(favourite){
      removeFromFavourites(movie.id);
    }else{
      if(user)
      addToFavourites(movie);
    else
      navigate("/auth");
    }
  }


  return (
    <div className="group flex flex-col items-start justify-center cursor-pointer bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="relative w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-40 object-cover"
        />
        <button onClick={() => handleFavourites(movie)}
          className="absolute top-2 right-2 flex items-center justify-center
                     rounded-full border border-white/70 p-1.5
                     bg-transparent opacity-0
                     group-hover:opacity-100
                     transition-opacity duration-200 cursor-pointer"
          aria-label="Add to favourites"
        >
          {isFavourite(movie.id)?<Heart size={16} color="red" fill="red" />:<Heart size={16} color="white" fill="white" />}
          
        </button>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <p className="text-gray-700 font-bold text-sm">{movie.title}</p>

        <p className="text-sm font-light">
          {movie.release_date?.split('-')[0]}
        </p>

        <div className="flex gap-1">
          <StarIcon className="text-yellow-400" size={20} />
          <p className="text-gray-600 font-bold text-sm">
            {movie.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
