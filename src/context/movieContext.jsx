
import { createContext, useContext, useEffect, useState } from 'react'

const MovieContext = createContext(null)

export default function MovieProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const storedFavs = localStorage.getItem('favourites')
    return storedFavs ? JSON.parse(storedFavs) : []
  })

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  function addToFavourites(movie) {
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev
      }

      return [...prev, movie]
    })
  }

  function removeFromFavourites(movieId) {
    setFavourites((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    )
  }

  function isFavourite(movieId) {
    return favourites.some((movie) => movie.id === movieId)
  }

  return (
    <MovieContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export function useMovie() {
  const context = useContext(MovieContext)

  if (context === null) {
    throw new Error('useMovie must be used within MovieProvider')
  }

  return context
}
