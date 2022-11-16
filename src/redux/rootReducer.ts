import { combineReducers } from '@reduxjs/toolkit';
import { currentUserSlice } from './currentUser.slice';

const rootReducer = combineReducers({
	[currentUserSlice.name]: currentUserSlice.reducer,
});

export default rootReducer;
