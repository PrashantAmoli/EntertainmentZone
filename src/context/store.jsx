import { configureStore } from '@reduxjs/toolkit';
import appReducer from './actions';

export default configureStore({
	reducer: {
		movies: appReducer,
	},
});
