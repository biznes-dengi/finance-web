import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {PageLayout} from '@pages/page-layout';

import {APP_PATH} from '@shared/constants';
import {goalsOverviewRoute} from '@pages/goal-overview';
import {pageNotFoundRoute} from '@pages/not-found';

const routing = createBrowserRouter([
	{element: <PageLayout />, children: [goalsOverviewRoute, pageNotFoundRoute]},
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RoutingProvider() {
	return <RouterProvider router={routing} />;
}
