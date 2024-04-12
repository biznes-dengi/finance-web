import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {BaseLayout, HomePageLayout} from '@pages/ui';

import {APP_PATH} from '@shared/config';
import {goalsOverviewRoute} from '@pages/goals-overview';
import {pageNotFoundRoute} from '@pages/not-found';
import {goalCreateRoute} from '@pages/goal-create';
import {goalDetailsRoute} from '@pages/goal-details';

const router = createBrowserRouter([
	/* module routes */
	{element: <HomePageLayout />, children: [goalsOverviewRoute]},
	{element: <BaseLayout />, children: [goalCreateRoute]},
	{element: <BaseLayout />, children: [goalDetailsRoute]},

	pageNotFoundRoute,
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RoutingProvider() {
	return <RouterProvider router={router} />;
}
