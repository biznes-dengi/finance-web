import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {APP_PATH} from '@shared/config';
import {pageNotFoundRoute} from '@pages/not-found';
import {goalRoute} from '@pages/goal';

const router = createBrowserRouter([
	...goalRoute,

	pageNotFoundRoute,
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RoutingProvider() {
	return <RouterProvider router={router} />;
}
