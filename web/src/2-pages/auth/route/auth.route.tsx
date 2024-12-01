import {LoginPage} from '../ui/LoginPage.tsx';
import {SignupPage} from '../ui/SignupPage.tsx';
import {APP_PATH} from '@shared/constants';

const loginRoute = {
	path: APP_PATH.login,
	element: <LoginPage />,
};

const signupRoute = {
	path: APP_PATH.signup,
	element: <SignupPage />,
};

export const authRoutes = [loginRoute, signupRoute];
