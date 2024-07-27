import {APP_PATH} from '@shared/config';

import {AppScreenLayout, AppLayout} from '@pages/ui';
import {SavingCreatePage} from '../ui/SavingCreatePage.tsx';
import {SavingDetailsPage} from '../ui/SavingDetailsPage.tsx';
import {SavingListPage} from '../ui/SavingListPage.tsx';
import {SavingTransferPage} from '../ui/SavingTransferPage.tsx';

import {withRouteGuard} from '@shared/lib';

// TODO: выделить UI build blocks, какие у каждого задачи

/** done */
const savingListRoute = {
	path: APP_PATH.root,
	element: withRouteGuard({page: <SavingListPage />}),
};

/** done */
const savingDetailsRoute = {
	path: APP_PATH.goalDetails,
	element: withRouteGuard({page: <SavingDetailsPage />}),
};

/** review */
const savingCreateRoute = {
	path: APP_PATH.createGoal,
	element: withRouteGuard({page: <SavingCreatePage />}),
};

/** review */
const savingTransferRoute = {
	path: APP_PATH.goalTransfer,
	element: withRouteGuard({page: <SavingTransferPage />}),
};

export const savingRoutes = [
	{element: <AppLayout />, children: [savingListRoute]},
	{element: <AppScreenLayout />, children: [savingDetailsRoute, savingCreateRoute, savingTransferRoute]},
];
