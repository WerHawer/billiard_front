import { HandleApiCallProps } from '../../types/api';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

export interface IRegistrationRequestPayload {
	email: string;
	password: string;
	name: string;
	nikName?: string;
}

export const registrationApiCall = ({
	email,
	password,
	name,
	nikName,
}: IRegistrationRequestPayload): HandleApiCallProps => ({
	props: {
		types: [REGISTRATION_REQUEST, REGISTRATION_SUCCESS, REGISTRATION_FAILURE],
		params: {
			url: '/registration',
			method: 'POST',
			payload: {
				email,
				password,
				name,
				nikName,
			},
		},
	},
});
