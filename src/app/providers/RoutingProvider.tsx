import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import {PageLayout} from '@pages/layout/ui/PageLayout.tsx';

import {APP_PATH} from '@shared/constants';
import {homePageRoute} from '@pages/home-page';
import {pageNotFoundRoute} from '@pages/not-found-page';

const routing = createBrowserRouter([
	{element: <PageLayout />, children: [homePageRoute, pageNotFoundRoute]},
	{path: '*', element: <Navigate to={APP_PATH.pageNotFound} replace />},
]);

export function RoutingProvider() {
	return <RouterProvider router={routing} />;
}
