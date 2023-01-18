import MovieCard from './MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../context/actions';

export default function Favourites() {
	const favourites = useSelector(state => state.movies.favourites);
	const dispatch = useDispatch();

	function handleCardClick(video) {
		if (video) dispatch(openModal(video));
	}

	return (
		<div className="flexbox flex-col">
			<div className="w-fit gap-6 flexbox mx-auto justify-items-start my-4">
				{favourites.map((video, index) => (
					<div onClick={() => handleCardClick(video)} key={index} className="hover:scale-105 transition-transform ">
						<MovieCard movieData={video} />
					</div>
				))}
			</div>
		</div>
	);
}
