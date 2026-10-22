const api_key = import.meta.env.VITE_API_KEY;
const base_url = import.meta.env.VITE_BASE_URL;

export const getPopularMovies =async () =>{
  const response = await fetch(`${base_url}/movie/popular?api_key=${api_key}`);
  if(!response.ok){
    throw new Error("Failed to fetch popular movies");
  }
  const data = await response.json();
  return data.results;
}

export const searchMovies = async (query) => {
  const response = await fetch(
    `${base_url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}`
  )

  if (!response.ok) {
    throw new Error('Failed to search movies')
  }

  const data = await response.json()
  return data.results
}

export const getMovieDetails = async (id) =>{
    const response = await fetch(`${base_url}/movie/${id}?api_key=${api_key}`);
      
      if(!response.ok){
        throw new Error('Failed to load movie details')
      }
      const data =await response.json();
      return data;

}