import {LoginPage} from '../ui/LoginPage.tsx';
import {RegisterPage} from '../ui/RegisterPage.tsx';

import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';

const loginRoute = {
	path: APP_PATH.login,
	element: withRouteGuard({page: <LoginPage />}),
};

const registerRoute = {
	path: APP_PATH.register,
	element: withRouteGuard({page: <RegisterPage />}),
};

export const authRoutes = [loginRoute, registerRoute];
