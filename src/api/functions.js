export function validateMovie(movie) {
	if (!movie) return false;
	if (!movie.backdrop_path || !movie.poster_path) return false;
	return true;
}

export function snakeCaseToTitleCase(snakeCase) {
	return snakeCase
		.split('_')
		.map(word => word[0].toUpperCase() + word.slice(1))
		.join(' ');
}
