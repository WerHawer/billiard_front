import React from 'react';
import styles from './AuthLayout.module.scss';

interface IAuthLayoutProps {
	children: React.ReactElement;
}

export const AuthLayout = ({ children }: IAuthLayoutProps) => {
	return (
		<div className={styles.container}>
			<h1>Auth page</h1>

			{children}
		</div>
	);
};
