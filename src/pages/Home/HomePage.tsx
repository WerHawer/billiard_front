import React, { memo } from 'react';
import styles from './HomePage.module.scss';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import namespace from '../../assets/locales/namespace';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearCurrentUser,
	currentUserShownNameSelector,
} from '../../redux/currentUser.slice';
import { useGoogleLogout } from 'react-google-login';
import envVariables from '../../envVariables';

export const HomePage = memo(() => {
	const { t } = useTranslation(namespace.test);
	const userName = useSelector(currentUserShownNameSelector);

	const dispatch = useDispatch();
	const { signOut: googleSignOut } = useGoogleLogout({
		clientId: envVariables.googleId,
	});

	const logout = () => {
		googleSignOut();
		dispatch(clearCurrentUser());
	};

	return (
		<div className={styles.container}>
			{t('hello')} {userName}
			<Button onClick={logout}>Logout</Button>
		</div>
	);
});
