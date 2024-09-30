import {APP_PATH} from '@shared/constants';

import {AppScreenLayout, AppLayout} from '@pages/ui';
import {SavingCreatePage} from '../ui/SavingCreatePage.tsx';
import {SavingDetailsPage} from '../ui/SavingDetailsPage.tsx';
import {SavingListPage} from '../ui/SavingListPage.tsx';
import {SavingTransferPage} from '../ui/SavingTransferPage.tsx';

import {withRouteGuard} from '@shared/lib';

const savingListRoute = {
	path: APP_PATH.root,
	element: withRouteGuard({page: <SavingListPage />}),
};

const savingDetailsRoute = {
	path: APP_PATH.goalDetails,
	element: withRouteGuard({page: <SavingDetailsPage />}),
};

const savingCreateRoute = {
	path: APP_PATH.createGoal,
	element: withRouteGuard({page: <SavingCreatePage />}),
};

const savingTransferRoute = {
	path: APP_PATH.goalTransfer,
	element: withRouteGuard({page: <SavingTransferPage />}),
};

export const savingRoutes = [
	{element: <AppLayout />, children: [savingListRoute]},
	{element: <AppScreenLayout />, children: [savingDetailsRoute, savingCreateRoute, savingTransferRoute]},
];
