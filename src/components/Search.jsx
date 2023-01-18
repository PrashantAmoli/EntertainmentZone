import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from './MovieCard';
import { updateSearchResults, openModal } from '../context/actions';
import { API_KEY } from '../api';

export default function Search() {
	const [searchTerm, setSearchTerm] = useState('');
	const [pageNumber, setPageNumber] = useState(0);
	const [year, setYear] = useState();

	const TypeRef = useRef(null);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm) getVideos();
		}, 2000);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);
	const searchResults = useSelector(state => state.movies.searchResults);
	const dispatch = useDispatch();

	// useEffect(() => {}, [videos]);

	async function getVideos() {
		try {
			let searchQuery = searchTerm;
			let type = TypeRef.current?.value || '';
			let url = 'https://www.omdbapi.com/?apikey=' + import.meta.env.VITE_OMDB_API_KEY + '&page=1&';

			url = url + 't=' + searchQuery;

			if (year) url = url + '&y=' + year;

			const response = await fetch(`${url}`);
			const data = await response.json();
			if (data.Poster === '' || !data.Year || data.Title !== '') dispatch(updateSearchResults(data));
		} catch (err) {
			console.log(err);
		}
	}

	function handleCardClick(movieData) {
		dispatch(openModal(movieData));
	}

	return (
		<div className="flexbox justify-center">
			{/* Search Bar */}
			<div className="flex justify-center pt-6 w-full sm:w-9/12">
				<div className=" bg-white rounded-xl flex items-center w-fit p-3 shadow-md border border-gray-200">
					<button className="outline-none focus:outline-none">
						<svg
							className=" w-5 text-gray-600 h-5 cursor-pointer"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</button>
					<input
						type="search"
						name="searchQuery"
						id="searchQuery"
						placeholder="Search for movies..."
						x-model="q"
						className="w-fit pl-4 text-sm outline-none focus:outline-none bg-transparent"
						onChange={e => setSearchTerm(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && setSearchTerm(e.target.value)}
						autoFocus
					/>
					<input
						type="number"
						min={1980}
						max={2023}
						name="year"
						id="year"
						placeholder="Year"
						x-model="q"
						className="pl-4 text-sm outline-none focus:outline-none bg-transparent"
						onChange={e => setYear(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && setYear(e.target.value)}
						autoFocus
					/>
				</div>
			</div>

			<div className="w-fit gap-6 flexbox mx-auto justify-items-start my-4">
				{searchResults.map((video, index) => (
					<div onClick={() => handleCardClick(video)} key={index} className="transition-transform bg-white/50 p-4 break-words max-w-5xl">
						<h2 className="text-head">
							{video.Title} ({video.Released})
						</h2>
						<h3 className="text-subhead">{video.Country}</h3>
						<h3 className="text-body">
							{video.Type?.toUpperCase()} Plot: {video.Plot}
						</h3>
						<h3 className="text-subhead">
							{video.Runtime} {video.Genre}
						</h3>
						<h3 className="text-subhead">Director: {video.Director}</h3>
						<h3 className="text-subhead">Writer: {video.Writer}</h3>
						<h3 className="text-subhead">Actors: {video.Actors}</h3>
						<h3 className="text-subhead">Language: {video.Language}</h3>
						<h3 className="text-body"></h3>
						<h3 className="text-body">{video.Awards}</h3>
						<h3 className="text-subhead">BoxOffice Collection: {video.BoxOffice}</h3>
						<h3 className="text-subhead"></h3>
						<h3 className="text-subhead">
							{video.imdbRating}/10 ({video.imdbVotes})
						</h3>
						<img src={video.Poster} alt="Poster" />
					</div>
				))}
			</div>
		</div>
	);
}
