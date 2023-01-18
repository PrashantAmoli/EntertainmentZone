import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from './MovieCard';
import { setMovies, updateMovies, openModal } from '../context/actions';
import { API_KEY } from '../api';
import { validateMovie } from '../api/functions';

const movieSortOptions = [
	{ name: 'Most Popular', value: 'popularity.desc' },
	{ name: 'Least Popular', value: 'popularity.asc' },
	{ name: 'Title Desc. a-z', value: 'original_title.desc' },
	{ name: 'Title Asc. z-a', value: 'original_title.asc' },
	{ name: 'Release Date Desc.', value: 'release_date.desc' },
	{ name: 'Release Date Asc.', value: 'release_date.asc' },
	{ name: 'Highest Rating', value: 'vote_average.desc' },
	{ name: 'Lowest Rating', value: 'vote_average.asc' },
	{ name: 'Highest Voted', value: 'vote_count.desc' },
	{ name: 'Lowest Voted', value: 'vote_count.asc' },
	{ name: 'Highest Revenue', value: 'revenue.desc' },
	{ name: 'Lowest Revenue', value: 'revenue.asc' },
	{ name: 'Primary Release Date Desc.', value: 'primary_release_date.desc' },
	{ name: 'Primary Release Date Asc.', value: 'primary_release_date.desc' },
];

export default function MovieSearch() {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchYear, setSearchYear] = useState(2023);
	const [pageNumber, setPageNumber] = useState(0);

	const sortRef = useRef(null);
	const movies = useSelector(state => state.movies.movies);
	const dispatch = useDispatch();

	let url = 'https://api.themoviedb.org/3/discover/movie?' + 'api_key=' + API_KEY + '&';

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Send Axios request here
			setPageNumber(0);
			getVideos();
		}, 2000);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, searchYear]);

	async function getVideos() {
		let sort = sortRef.current?.value || '';

		if (pageNumber > 0) url = `${url}page=${pageNumber + 1}&`;
		setPageNumber(pageNumber + 1);
		if (sort) url = `${url}sort_by=${sort}&`;
		if (searchYear) url = `${url}year=${searchYear}&`;

		const response = await fetch(`${url}`);
		const data = await response.json();
		const filteredData = data.results.filter(validateMovie);

		// Update in redux store
		if (data.results.length) dispatch(setMovies(filteredData));
	}

	async function loadMore() {
		let sort = sortRef.current?.value || '';

		setPageNumber(currentPageNumber => currentPageNumber + 1);

		if (pageNumber > 0) url = `${url}page=${pageNumber}&`;
		if (sort) url = `${url}sort_by=${sort}&`;
		if (searchYear) url = `${url}year=${searchYear}&`;

		const response = await fetch(`${url}`);
		const data = await response.json();
		const filteredData = data.results.filter(validateMovie);

		// Update in redux store
		if (data.results.length) dispatch(updateMovies(filteredData));
	}

	function handleCardClick(movieData) {
		dispatch(openModal(movieData));
	}

	return (
		<div className="flexbox flex-col">
			{/* Search Bar */}
			<div className="pt-6 w-11/12 sm:w-9/12 ">
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
						disabled
					/>
					<input
						type="number"
						name="year"
						id="year"
						min={1980}
						max={2023}
						step={1}
						placeholder="Year"
						x-model="q"
						className="w-max pl-4 text-sm outline-none focus:outline-none bg-transparent"
						onChange={e => setSearchYear(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && setSearchYear(e.target.value)}
					/>
					<div className="select">
						<select
							name="type"
							id="type"
							x-model="image_type"
							className="text-sm outline-none focus:outline-none bg-transparent"
							ref={sortRef}
							defaultValue="popularity.desc"
						>
							<option value="keyword">All</option>
							{movieSortOptions.map((type, index) => (
								<option key={index} value={type.value}>
									{type.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			<div className="w-fit gap-6 flexbox mx-auto justify-items-start my-4">
				{movies.map((video, index) => (
					<div onClick={() => handleCardClick(video)} key={index} className="hover:scale-105 transition-transform ">
						<MovieCard movieData={video} />
					</div>
				))}
			</div>

			{pageNumber > 0 ? (
				<div className="w-full flex justify-center px-6">
					<button type="submit" className="btn-primary" onClick={loadMore}>
						Load More
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
