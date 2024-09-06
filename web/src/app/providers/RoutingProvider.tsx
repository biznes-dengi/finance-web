import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {APP_PATH} from '@shared/constants';
import {pageNotFoundRoute} from '@pages/not-found';
import {savingRoutes} from '@pages/saving';

const router = createBrowserRouter([
	{children: [...savingRoutes, pageNotFoundRoute]},

	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RoutingProvider() {
	return <RouterProvider router={router} />;
}
