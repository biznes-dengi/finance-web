import {LoginPage} from '../ui/LoginPage.tsx';
import {RegisterPage} from '../ui/RegisterPage.tsx';
import {APP_PATH} from '@shared/constants';

const loginRoute = {
	path: APP_PATH.login,
	element: <LoginPage />,
};

const registerRoute = {
	path: APP_PATH.register,
	element: <RegisterPage />,
};

export const authRoutes = [loginRoute, registerRoute];
