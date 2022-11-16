import { HandleApiCallProps } from '../../types/api';

export const FETCH_IS_AUTH_REQUEST = 'FETCH_IS_AUTH_REQUEST';
export const FETCH_IS_AUTH_SUCCESS = 'FETCH_IS_AUTH_SUCCESS';
export const FETCH_IS_AUTH_FAILURE = 'FETCH_IS_AUTH_FAILURE';

export const fetchIsAuthApiCall = (): HandleApiCallProps => ({
	props: {
		types: [
			FETCH_IS_AUTH_REQUEST,
			FETCH_IS_AUTH_SUCCESS,
			FETCH_IS_AUTH_FAILURE,
		],
		params: {
			url: '/auth',
			method: 'GET',
		},
	},
});
