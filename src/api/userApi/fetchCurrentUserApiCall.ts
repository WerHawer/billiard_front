import { HandleApiCallProps } from '../../types/api';

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';

export const fetchCurrentUserApiCall = (): HandleApiCallProps => ({
	props: {
		types: [
			FETCH_CURRENT_USER_REQUEST,
			FETCH_CURRENT_USER_SUCCESS,
			FETCH_CURRENT_USER_FAILURE,
		],
		params: {
			url: '/user/me',
			method: 'GET',
		},
	},
});
