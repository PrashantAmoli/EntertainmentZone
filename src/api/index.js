export const API_KEY = import.meta.env.VITE_MOVIEDB_API_KEY;

export const MULTI_SEARCH = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`;
// TODO &include_adult=false&query=${searchQuery}&page=1

export const KEYWORD_SEARCH = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}`;
// TODO &query=${searcQuery}&page=1

export const MOVIE_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
// TODO &query=${searchQuery}&page=1&include_adult=false

export const TV_SEARCH = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`;
// TODO &query=${searchQuery}&page=1&include_adult=false

export const PERSON_SEARCH = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}`;
// TODO &query=${searchQuery}&page=1&include_adult=false

export const TRENDING_SEARCH = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
// TODO

export const MOVIEDB_IMAGE = 'https://image.tmdb.org/t/p/w500';
// append poster_path OR backdrop_path to this

export const MOVIEDB_IMAGE_HD = 'https://image.tmdb.org/t/p/original';
// append poster_path OR backdrop_path to this

// export const MOVIEDB_IMAGES = `https://api.themoviedb.org/3/media_type/id/images?api_key=${API_KEY}`;
// // TODO replace("media_type", "movie" || "tv" || "person") && replace("id", "id")
