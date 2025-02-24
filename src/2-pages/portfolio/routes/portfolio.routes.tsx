import {AppLayout, FullScreenPageLayout} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {APP_PATH} from '@shared/constants';
import {PortfolioListPage} from '../ui/PortfolioListPage.tsx';
import {PortfolioCreatePage} from '../ui/PortfolioCreatePage.tsx';
import {PortfolioConnectWalletPage} from '../ui/PortfolioConnectWalletPage.tsx';
import {PortfolioConnectedWalletsPage} from '../ui/PortfolioConnectedWalletsPage.tsx';

const portfolioListRoute = {
	path: APP_PATH.portfolio.list,
	element: <PrivateRoute page={<PortfolioListPage />} />,
};

const portfolioInfoRoute = {
	path: APP_PATH.portfolio.connectWallet,
	element: <PrivateRoute page={<PortfolioConnectWalletPage />} />,
};

const portfolioConnectedWalletsRoute = {
	path: APP_PATH.portfolio.connectedWallets,
	element: <PrivateRoute page={<PortfolioConnectedWalletsPage />} />,
};

const portfolioCreateRoute = {
	path: APP_PATH.portfolio.create,
	element: <PrivateRoute page={<PortfolioCreatePage />} />,
};

export const portfolioRoutes = [
	{element: <AppLayout />, children: [portfolioListRoute]},
	{
		element: <FullScreenPageLayout />,
		children: [portfolioCreateRoute, portfolioInfoRoute, portfolioConnectedWalletsRoute],
	},
];
