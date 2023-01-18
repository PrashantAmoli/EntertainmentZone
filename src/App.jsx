import { Route, Routes } from 'react-router-dom';
import { Navbar, MovieModal, Homepage, Search, MovieSearch, TVSearch, Favourites } from './components';

export default function App() {
	return (
		<div className="bg-gradient-to-l from-gray-500 via-gray-200 to-gray-500 hover:bg-gradient-to-r hover:from-gray-500 hover:via-gray-300  hover:to-gray-400 min-h-screen w-full">
			<Navbar />
			<MovieModal />

			<Routes>
				<Route exact path="/" element={<Homepage />} />
				<Route path="/search" element={<Search />} />
				<Route path="/movie" element={<MovieSearch />} />
				<Route path="/tv" element={<TVSearch />} />
				<Route path="/favourites" element={<Favourites />} />
			</Routes>
		</div>
	);
}
