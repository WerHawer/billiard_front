export const routPath = {
	home: '/',
	auth: '/auth',
	login: 'login',
	registration: 'registration',
};

export const navRoutPath = {
	home: '/',
	login: `${routPath.auth}/${routPath.login}`,
	registration: `${routPath.auth}/${routPath.registration}`,
};

export const notAuthPath = [routPath.login, routPath.registration];
