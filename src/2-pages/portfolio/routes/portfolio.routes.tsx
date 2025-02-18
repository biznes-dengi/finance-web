import {AppLayout} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {APP_PATH} from '@shared/constants';
import {PortfolioListPage} from '../ui/PortfolioListPage.tsx';

const portfolioListRoute = {
	path: APP_PATH.portfolio.list,
	element: <PrivateRoute page={<PortfolioListPage />} />,
};

export const portfolioRoutes = [{element: <AppLayout />, children: [portfolioListRoute]}];
