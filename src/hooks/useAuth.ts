import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { notAuthPath, navRoutPath } from '../router/routPath';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector, setAuth } from '../redux/currentUser.slice';
import { handleApiCall } from '../api/handleApiCall';
import { fetchIsAuthApiCall } from '../api/authApi/fetchIsAuthApiCall';
import LS from '../utils/localStorage';
import { isNil } from 'lodash';
import { isPathInArr } from '../helpers/isPathInArr';
import envVariables from '../envVariables';

export const useAuth = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(isAuthSelector);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const token = LS.load(envVariables.tokenLSName);

	const isAuthNull = isNil(isAuth);
	const isNeedAuthPage = !isPathInArr(pathname, notAuthPath);

	useEffect(() => {
		if (isAuthNull && token) {
			// @ts-ignore
			dispatch(handleApiCall(fetchIsAuthApiCall()));

			return;
		}

		if (!token && isNeedAuthPage) {
			navigate(navRoutPath.login);
			// dispatch(clearCurrentUser());
			dispatch(setAuth(false));

			return;
		}

		if (isAuth && !isNeedAuthPage) {
			navigate(navRoutPath.home);

			return;
		}
	}, [isAuth, token, pathname]);
};
