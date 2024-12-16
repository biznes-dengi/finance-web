import {createBrowserRouter, Navigate, RouterProvider as ReactRouterProvider} from 'react-router-dom';

import {APP_PATH} from '@shared/constants';
import {pageNotFoundRoute} from '@pages/not-found';
import {goalRoutes} from '@pages/goal';
import {authRoutes} from '@pages/auth/route/auth.route.tsx';

const router = createBrowserRouter([
	{
		children: [...goalRoutes, ...authRoutes, pageNotFoundRoute],
	},

	{path: APP_PATH.root, element: <Navigate to={APP_PATH.login} replace />},
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RouterProvider() {
	return <ReactRouterProvider router={router} />;
}
