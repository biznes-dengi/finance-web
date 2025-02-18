import {AppLayout, FullScreenPageLayout} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {APP_PATH} from '@shared/constants';
import {PortfolioListPage} from '../ui/PortfolioListPage.tsx';
import {PortfolioCreatePage} from '../ui/PortfolioCreatePage.tsx';

const portfolioListRoute = {
	path: APP_PATH.portfolio.list,
	element: <PrivateRoute page={<PortfolioListPage />} />,
};

const portfolioCreateRoute = {
	path: APP_PATH.portfolio.create,
	element: <PrivateRoute page={<PortfolioCreatePage />} />,
};

export const portfolioRoutes = [
	{element: <AppLayout />, children: [portfolioListRoute]},
	{element: <FullScreenPageLayout />, children: [portfolioCreateRoute]},
];
