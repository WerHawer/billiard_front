import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/user';
import {
	LOGIN_FAILURE,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
} from '../api/authApi/loginApiCall';
import { ApiResponsePayload } from '../types/api';
import LS from '../utils/localStorage';
import { RootState } from '../store';
import { get } from 'lodash/fp';
import { FETCH_IS_AUTH_SUCCESS } from '../api/authApi/fetchIsAuthApiCall';
import {
	REGISTRATION_FAILURE,
	REGISTRATION_SUCCESS,
} from '../api/authApi/registrationApiCall';
import envVariables from '../envVariables';
import { GOOGLE_LOGIN_SUCCESS } from '../api/authApi/googleLoginApiCall';

interface CurrentUserState {
	isUserLoading: boolean;
	isAuth: boolean | null;
	user: IUser | null;
}

const initialState: CurrentUserState = {
	isUserLoading: false,
	isAuth: null,
	user: null,
};

const addUserBySuccessResponse = (
	state: CurrentUserState,
	{ payload }: PayloadAction<ApiResponsePayload<{ user: IUser; token: string }>>
) => {
	state.isUserLoading = false;
	state.isAuth = true;
	state.user = payload.response.user;

	LS.save(envVariables.tokenLSName, payload.response.token);
};

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		clearCurrentUser: () => {
			LS.save(envVariables.tokenLSName, '');

			return initialState;
		},

		setAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
	},

	extraReducers: {
		[LOGIN_REQUEST]: (state) => {
			state.isUserLoading = true;
		},

		[LOGIN_SUCCESS]: addUserBySuccessResponse,

		[GOOGLE_LOGIN_SUCCESS]: addUserBySuccessResponse,

		[REGISTRATION_SUCCESS]: addUserBySuccessResponse,

		[FETCH_IS_AUTH_SUCCESS]: (state) => {
			state.isAuth = true;
		},

		[LOGIN_FAILURE]: (state) => {
			state.isUserLoading = false;
		},

		[REGISTRATION_FAILURE]: (state) => {
			state.isUserLoading = false;
		},
	},
});

export const { clearCurrentUser, setAuth } = currentUserSlice.actions;

const currentUserState = (state: RootState) => state.currentUser;

export const currentUserSelector = createSelector(
	currentUserState,
	get('user')
);
export const isAuthSelector = createSelector(currentUserState, get('isAuth'));

export const isUserLoadingSelector = createSelector(
	currentUserState,
	get('isUserLoading')
);

export const currentUserNameSelector = createSelector(
	currentUserSelector,
	get('name')
);
export const currentUserNikNameSelector = createSelector(
	currentUserSelector,
	get('nikName')
);
export const currentUserShownNameSelector = createSelector(
	currentUserNameSelector,
	currentUserNikNameSelector,
	(name, nikName) => nikName || name || 'Anonymous'
);
