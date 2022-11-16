import { HandleApiCallProps } from '../../types/api';

export const GOOGLE_LOGIN_REQUEST = 'GOOGLE_LOGIN_REQUEST';
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const GOOGLE_LOGIN_FAILURE = 'GOOGLE_LOGIN_FAILURE';

export const googleLoginApiCall = (authId: string): HandleApiCallProps => ({
	props: {
		types: [GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE],
		params: {
			url: '/login/google',
			method: 'POST',
			payload: { authId },
		},
	},
});
