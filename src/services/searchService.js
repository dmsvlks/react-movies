export const searchMovie = async query => {
  const results = await fetch(`http://api.themoviedb.org/3/search/movie?query=${query}&api_key=0b002a83940472278a2adfacec7a12d8`)
    .then(res => res.json())
    .then(res => res.results)

  return results;
}