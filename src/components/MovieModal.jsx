import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '../context/actions';
import { MOVIEDB_IMAGE_HD } from '../api';

export default function MovieModal() {
	const dispatch = useDispatch();
	const modalOpen = useSelector(state => state.movies.modalOpen);
	const modalData = useSelector(state => state.movies.modalData);

	function handleClose() {
		dispatch(closeModal());
	}

	function handleOpen() {
		dispatch(openModal());
	}

	return (
		<>
			{/* <div className="fixed inset-0 flex items-center justify-center">
				<button
					type="button"
					onClick={() => handleOpen({ id: 1, title: 'test' })}
					className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					Open dialog
				</button>
			</div> */}

			<Transition appear show={modalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleClose}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-7xl h-[90vh] sm:h-[85vh] transform overflow-hidden rounded-2xl bg-white p-2 pb-6 sm:p-6 text-left align-middle shadow-xl transition-all select-none">
									{/* Backdrop cover poster image */}
									<img
										src={`${MOVIEDB_IMAGE_HD}${modalData.backdrop_path}`}
										alt=""
										className="w-full h-full object-cover absolute -top-1 left-0 -z-20"
									/>

									<Dialog.Title
										as="h3"
										className="text-xl font-medium leading-6 text-head bg-white/50 backdrop-blur-3xl absolute -top-4 -left-4 p-3 pt-8 px-8 w-10/12 sm:w-max rounded-3xl shadow-2xl"
									>
										{modalData.title || modalData.name} {modalData.media_type ? `(${modalData.media_type?.toUpperCase()})` : ''}
									</Dialog.Title>

									{/* Poster */}
									<img
										src={`${MOVIEDB_IMAGE_HD}${modalData.poster_path}`}
										alt=""
										className="w-24 sm:w-40  object-cover transition-transform duration-300 ease-in-out transform hover:scale-125 rounded-lg opacity-50 hover:opacity-90 absolute left-0 top-0 hover:translate-x-7 hover:translate-y-11 -z-20 hover:w-36 sm:hover:w-60"
									/>

									<div className="flex flex-col w-full h-max p-2 py-4 rounded-lg bg-white/70 backdrop-blur gap-2 absolute bottom-0 left-0 select-text">
										<h3 className="text-subhead break-words">Overview: {modalData.overview}</h3>
										<h3 className="text-subhead">
											{modalData.media_type?.toUpperCase()} Release Date: {modalData.release_date || modalData.first_air_date}
										</h3>
										<h3 className="text-subhead"></h3>
										<h3 className="text-subhead">
											{modalData.vote_average}/10 ({modalData.vote_count} Votes)
										</h3>
										<h3 className="text-subhead">{modalData.adult ? '18+' : ''}</h3>
									</div>

									{/* modal close Button */}
									<button
										type="button"
										onClick={handleClose}
										className="absolute z-40 top-2 right-2 inline-flex justify-center rounded-full border border-transparent bg-white/50 backdrop-blur-3xl p-1 hover:scale-110 font-bold focus-visible:ring-offset-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-6 h-6 hover:text-red-600"
										>
											<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
