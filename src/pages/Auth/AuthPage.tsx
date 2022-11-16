import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthLayout } from '../../layouts/AuthLayout';

export const AuthPage = memo(() => {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
});
