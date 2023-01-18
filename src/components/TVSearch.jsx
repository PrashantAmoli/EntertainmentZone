import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from './MovieCard';
import { setTV, updateTV, openModal } from '../context/actions';
import { API_KEY } from '../api';
import { validateMovie } from '../api/functions';

const tvSortOptions = [
	// * https://api.themoviedb.org/3/discover/tv?
	{ name: 'Most Popular', value: 'popularity.desc' },
	{ name: 'Least Popular', value: 'popularity.asc' },
	{ name: 'Highest Rating', value: 'vote_average.desc' },
	{ name: 'Lowest Rating', value: 'vote_average.asc' },
	{ name: 'First Release Date Descending', value: 'first_release_date.desc' },
	{ name: 'First Release Date Ascending', value: 'first_release_date.desc' },
];

export default function TVSearch() {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchYear, setSearchYear] = useState();
	const [pageNumber, setPageNumber] = useState(0);

	const sortRef = useRef(null);
	const tv = useSelector(state => state.movies.tv);
	const dispatch = useDispatch();

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			// Send API request here
			setPageNumber(0);
			getVideos(searchTerm);
		}, 2000);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, searchYear]);
	let url = 'https://api.themoviedb.org/3/discover/tv?' + 'api_key=' + API_KEY + '&';

	async function getVideos() {
		let sort = sortRef.current?.value || '';

		if (pageNumber > 0) url = `${url}page=${pageNumber + 1}&`;
		setPageNumber(currentPageNumber => currentPageNumber + 1);
		if (sort) url = `${url}sort_by=${sort}&`;
		if (searchYear) url = `${url}year=${searchYear}&`;

		const response = await fetch(`${url}`);
		const data = await response.json();
		const filteredData = data.results.filter(validateMovie);
		if (data.results.length) dispatch(setTV(filteredData));
	}

	// Fetch Next page
	async function loadMore() {
		let sort = sortRef.current?.value || '';
		setPageNumber(currentPageNumber => currentPageNumber + 1);

		if (pageNumber > 0) url = `${url}page=${pageNumber}&`;
		if (sort) url = `${url}sort_by=${sort}&`;
		if (searchYear) url = `${url}year=${searchYear}&`;

		const response = await fetch(`${url}`);
		const data = await response.json();
		const filteredData = data.results.filter(validateMovie);
		if (data.results.length) dispatch(updateTV(filteredData));
	}

	function handleCardClick(movieData) {
		dispatch(openModal(movieData));
	}

	return (
		<div className="flexbox">
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
							defaultValue="first_release_date.desc"
							onChange={getVideos}
						>
							<option value="Sort" disabled>
								Sort
							</option>
							{tvSortOptions.map((type, index) => (
								<option key={index} value={type.value}>
									{type.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			<div className="w-fit gap-6 flexbox mx-auto justify-items-start my-4">
				{tv.map((video, index) => (
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
