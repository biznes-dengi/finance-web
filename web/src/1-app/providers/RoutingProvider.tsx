import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {APP_PATH} from '@shared/constants';
import {pageNotFoundRoute} from '@pages/not-found';
import {goalRoutes} from '@pages/goal';

const router = createBrowserRouter([
	{children: [...goalRoutes, pageNotFoundRoute]},

	{path: '/', element: <Navigate to={APP_PATH.goalList} replace />},
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RoutingProvider() {
	return <RouterProvider router={router} />;
}
