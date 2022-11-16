import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import { SizeLayout } from './layouts/SizeLayout';
import { navRoutPath, routPath } from './router/routPath';
import { AuthPage } from './pages/Auth';

function App() {
	useAuth();

	return (
		<SizeLayout>
			<Routes>
				<Route path={routPath.home} element={<HomePage />} />
				<Route path={`${routPath.auth}/*`} element={<AuthPage />}>
					<Route path={routPath.login} element={<LoginPage />} />
					<Route path={routPath.registration} element={<RegistrationPage />} />
					<Route path="*" element={<Navigate to={navRoutPath.login} />} />
				</Route>
				<Route path="*" element={<Navigate to={navRoutPath.home} />} />
			</Routes>
		</SizeLayout>
	);
}

export default App;
