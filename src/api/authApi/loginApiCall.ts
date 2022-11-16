import { HandleApiCallProps } from '../../types/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export interface ILoginRequestPayload {
	email: string;
	password: string;
}

export const loginApiCall = ({
	email,
	password,
}: ILoginRequestPayload): HandleApiCallProps => ({
	props: {
		types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
		params: {
			url: '/login',
			method: 'POST',
			payload: {
				email,
				password,
			},
		},
	},
});
