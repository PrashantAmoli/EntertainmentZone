import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from './MovieCard';
import { setVideos, updateVideos, openModal } from '../context/actions';
import { MULTI_SEARCH, KEYWORD_SEARCH, MOVIE_SEARCH, TV_SEARCH, PERSON_SEARCH, TRENDING_SEARCH } from '../api';
import { validateMovie } from '../api/functions';

const MediaTypes = [
	{ name: 'Movies', value: 'movie' },
	{ name: 'TV Show', value: 'tv' },
	{ name: 'TV & Movies', value: 'multi' },
];

export default function Homepage() {
	const [searchTerm, setSearchTerm] = useState('');

	const TypeRef = useRef(null);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Send Axios request here
			getVideos();
		}, 2000);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);
	const videos = useSelector(state => state.movies.videos);
	const dispatch = useDispatch();

	// useEffect(() => {}, [videos]);

	async function getVideos() {
		let searchQuery = searchTerm;
		let type = TypeRef.current?.value || 'keyword';
		const pageNumber = 1;
		let url = '';

		if (searchQuery === '') type = 'trending';

		switch (type) {
			case 'movie':
				url = `${MOVIE_SEARCH}&query=${searchQuery.replace(' ', '%20')}&page=${pageNumber}`;
				break;
			case 'tv':
				url = `${TV_SEARCH}&query=${searchQuery.replace(' ', '%20')}&page=${pageNumber}`;
				break;
			case 'multi':
				url = `${MULTI_SEARCH}&query=${searchQuery.replace(' ', '%20')}&page=${pageNumber}`;
				break;
			case 'person':
				url = `${PERSON_SEARCH}&query=${searchQuery.replace(' ', '%20')}&page=${pageNumber}`;
				break;
			case 'keyword':
				url = `${KEYWORD_SEARCH}&query=${searchQuery.replace(' ', '%20')}&page=${pageNumber}`;
				break;
			default:
				url = `${TRENDING_SEARCH}&page=${pageNumber}`;
				break;
		}

		const response = await fetch(`${url}`);
		const data = await response.json();
		const filteredData = data.results.filter(validateMovie);
		if (data.results?.length) dispatch(setVideos(filteredData));
	}

	function handleCardClick(movieData) {
		dispatch(openModal(movieData));
	}

	return (
		<div className="flexbox">
			{/* Search Bar */}
			<div className="pt-6 mx-auto w-full sm:w-9/12 hover:scale-105 focus:scale-105">
				<div className=" bg-white rounded-xl flex items-center w-full p-3 shadow-md border border-gray-200">
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
						placeholder="Search for movies, tv shows, actors..."
						x-model="q"
						className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"
						onChange={e => setSearchTerm(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && setSearchTerm(e.target.value)}
						autoFocus
					/>
					<div className="select">
						<select
							name="type"
							id="type"
							x-model="image_type"
							className="text-sm outline-none focus:outline-none bg-transparent"
							ref={TypeRef}
							defaultValue="multi"
						>
							<option value="keyword" disabled>
								Media Type
							</option>
							{MediaTypes.map((type, index) => (
								<option key={index} value={type.value}>
									{type.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			<div className="w-fit gap-6 flexbox mx-auto justify-items-start my-4">
				{videos.map((video, index) => (
					<div onClick={() => handleCardClick(video)} key={index} className="hover:scale-105 transition-transform ">
						<MovieCard movieData={video} />
					</div>
				))}
			</div>
		</div>
	);
}
