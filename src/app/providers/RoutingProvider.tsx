import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {PageLayout} from '@pages/page-layout';

import {APP_PATH} from '@shared/config';
import {goalsOverviewRoute} from '@pages/goals-overview';
import {pageNotFoundRoute} from '@pages/not-found';
import {goalCreateRoute} from '@pages/goal-create';

/**
 * MainPageLayout vs PageLayout
 */

const routing = createBrowserRouter([
	/* module routes */
	{element: <PageLayout />, children: [goalsOverviewRoute]},
	goalCreateRoute,

	/* app ux routes */
	pageNotFoundRoute,
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RoutingProvider() {
	return (
		<div role='app-container' className='h-full bg-light-grey'>
			<RouterProvider router={routing} />
		</div>
	);
}
