import React, { memo, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import envVariables from '../../envVariables';
import { useDispatch } from 'react-redux';
import { handleApiCall } from '../../api/handleApiCall';
import { googleLoginApiCall } from '../../api/authApi/googleLoginApiCall';

const clientId = envVariables.googleId;

export const GoogleLoginButton = memo(() => {
	const dispatch = useDispatch();

	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId,
				scope: '',
			});
		};
		gapi.load('client:auth2', initClient);
	}, []);

	const onSuccess = (res: any) => {
		//@ts-ignore
		dispatch(handleApiCall(googleLoginApiCall(res.tokenId)));
	};
	const onFailure = (err: any) => {
		console.log('failed:', err);
	};

	return (
		<GoogleLogin
			clientId={clientId}
			buttonText="Sign in with Google"
			onSuccess={onSuccess}
			onFailure={onFailure}
			cookiePolicy={'single_host_origin'}
			isSignedIn={true}
		/>
	);
});
