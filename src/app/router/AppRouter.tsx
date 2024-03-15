import {lazy} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import {Loadable} from '@app/router/components/Loadable.tsx';
import {RouteGuard} from '@app/router/components/RouteGuard.tsx';
import {APP_ROUTER} from '@shared/constants';

const NotFoundPage = Loadable(lazy(() => import('@pages/not-found-page')));
const HomePage = Loadable(lazy(() => import('@pages/home-page')));

export function AppRouter() {
	return useRoutes([
		{path: APP_ROUTER.root, element: <RouteGuard element={<HomePage />} />},

		{path: APP_ROUTER.pageNotFound, element: <NotFoundPage />},
		{path: '*', element: <Navigate to={APP_ROUTER.pageNotFound} replace />},
	]);
}
