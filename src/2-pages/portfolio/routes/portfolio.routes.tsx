import {AppLayout, FullScreenPageLayout} from '@pages/ui';
import {PrivateRoute} from '@shared/lib';
import {APP_PATH} from '@shared/constants';
import {PortfolioListPage} from '../ui/PortfolioListPage.tsx';
import {PortfolioCreatePage} from '../ui/PortfolioCreatePage.tsx';
import {PortfolioWalletConnectPage} from '../ui/PortfolioWalletConnectPage.tsx';
import {PortfolioWalletListPage} from '../ui/PortfolioWalletListPage.tsx';
import {PortfolioWalletDetailsPage} from '../ui/PortfolioWalletDetailsPage.tsx';
import {PortfolioWalletEditPage} from '../ui/PortfolioWalletEditPage.tsx';

const portfolioListRoute = {
	path: APP_PATH.portfolio.list,
	element: <PrivateRoute page={<PortfolioListPage />} />,
};

const portfolioInfoRoute = {
	path: APP_PATH.portfolio.connectWallet,
	element: <PrivateRoute page={<PortfolioWalletConnectPage />} />,
};

const portfolioConnectedWalletsRoute = {
	path: APP_PATH.portfolio.wallets,
	element: <PrivateRoute page={<PortfolioWalletListPage />} />,
};

const portfolioCreateRoute = {
	path: APP_PATH.portfolio.create,
	element: <PrivateRoute page={<PortfolioCreatePage />} />,
};

const portfolioWalletDetailsRoute = {
	path: `${APP_PATH.portfolio.wallets}/:id`,
	element: <PrivateRoute page={<PortfolioWalletDetailsPage />} />,
};

const portfolioWalletEditRoute = {
	path: `${APP_PATH.portfolio.wallets}/:id/edit`,
	element: <PrivateRoute page={<PortfolioWalletEditPage />} />,
};

export const portfolioRoutes = [
	{element: <AppLayout />, children: [portfolioListRoute]},
	{
		element: <FullScreenPageLayout />,
		children: [
			portfolioCreateRoute,
			portfolioInfoRoute,
			portfolioConnectedWalletsRoute,
			portfolioWalletDetailsRoute,
			portfolioWalletEditRoute,
		],
	},
];
