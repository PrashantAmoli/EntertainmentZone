import { createSlice } from '@reduxjs/toolkit';

const modalDefaultData = {
	id: '',
	title: '',
	videoId: '',
	bucket: '',
	link: '',
};

export const appSlice = createSlice({
	name: 'movies',

	initialState: {
		pageNumber: 0,
		modalOpen: false,
		modalData: {
			id: '',
			title: '',
			videoId: '',
			bucket: '',
			link: '',
		},
		bannerShow: true,
		bannerMessage: 'Welcome to YouTube Media Player by @PrashantAmoli',
		query: '',
		videos: [],
		movies: [],
		tv: [],
		searchResults: [],
		favourites: [],
	},

	reducers: {
		incrementPage: state => {
			state.pageNumber += 1;
		},
		decrementPage: state => {
			state.pageNumber -= 1;
		},
		setPage: (state, action) => {
			state.pageNumber = action.payload;
		},
		openModal: (state, action) => {
			state.modalOpen = true;
			state.modalData = action.payload;
		},
		closeModal: state => {
			state.modalOpen = false;
			state.modalData = modalDefaultData;
		},
		updateQuery: (state, action) => {
			state.query = action.payload;
		},
		setVideos: (state, action) => {
			state.videos = [...action.payload];
		},
		updateVideos: (state, action) => {
			state.videos = [action.payload, ...state.videos?.filter(item => item.id !== action.payload.id)];
		},
		deleteVideos: (state, action) => {
			state.videos = [...state.videos.filter(item => item.id !== action.payload.id)];
		},
		setMovies: (state, action) => {
			state.movies = [...action.payload];
		},
		updateMovies: (state, action) => {
			state.movies = [...state.movies?.filter(item => item.id !== action.payload.id), ...action.payload];
		},
		deleteMovies: (state, action) => {
			state.movies = [...state.movies.filter(item => item.id !== action.payload.id)];
		},
		setTV: (state, action) => {
			state.tv = [...action.payload];
		},
		updateTV: (state, action) => {
			state.tv = [...action.payload, ...state.tv?.filter(item => item.Title !== action.payload.Title)];
		},
		deleteTV: (state, action) => {
			state.tv = [...state.tv.filter(item => item.id !== action.payload.id)];
		},
		setSearchResults: (state, action) => {
			state.searchResults = [action.payload];
		},
		updateSearchResults: (state, action) => {
			state.searchResults = [action.payload, ...state.searchResults.filter(item => item.id !== action.payload.id)];
		},
		deleteSearchResults: (state, action) => {
			state.searchResults = [...state.searchResults.filter(item => item.id !== action.payload.id)];
		},
		addFavourites: (state, action) => {
			state.favourites = [action.payload, ...state.favourites?.filter(item => item.id !== action.payload.id)];
		},
		removeFavourites: (state, action) => {
			state.favourites = [...state.favourites?.filter(item => item.id !== action.payload.id)];
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	incrementPage,
	decrementPage,
	setPage,
	// Modal
	openModal,
	closeModal,
	// Videos
	setVideos,
	updateVideos,
	deleteVideos,
	// Movies
	setMovies,
	updateMovies,
	deleteMovies,
	// TV
	setTV,
	updateTV,
	deleteTV,
	//  Search
	setSearchResults,
	updateSearchResults,
	// Favourites
	addFavourites,
	removeFavourites,
	updateQuery,
} = appSlice.actions;

export default appSlice.reducer;
