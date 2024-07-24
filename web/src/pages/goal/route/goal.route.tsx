import {APP_PATH} from '@shared/config';

import {AppScreenLayout, AppLayout} from '@pages/ui';
import {GoalCreatePage} from '../ui/GoalCreatePage.tsx';
import {GoalDetailsPage} from '../ui/GoalDetailsPage.tsx';
import {GoalListPage} from '../ui/GoalListPage.tsx';
import {SavingTransferPage} from '../ui/SavingTransferPage.tsx';

import {withRouteGuard} from '@shared/lib';

const goalCreateRoute = {
	path: APP_PATH.createGoal,
	element: withRouteGuard({page: <GoalCreatePage />}),
};

const goalDetailsRoute = {
	path: APP_PATH.goalDetails,
	element: withRouteGuard({page: <GoalDetailsPage />}),
};

const goalListRoute = {
	path: APP_PATH.root,
	element: withRouteGuard({page: <GoalListPage />}),
};

const goalTransferRoute = {
	path: APP_PATH.goalTransfer,
	element: withRouteGuard({page: <SavingTransferPage />}),
};

export const goalRoutes = [
	{element: <AppLayout />, children: [goalListRoute]},
	{element: <AppScreenLayout />, children: [goalCreateRoute, goalDetailsRoute, goalTransferRoute]},
];
