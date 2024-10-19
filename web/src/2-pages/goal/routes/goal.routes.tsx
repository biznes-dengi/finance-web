import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';
import {AppScreenLayout, AppLayout} from '@pages/ui';
import {GoalCreatePage} from '../ui/GoalCreatePage.tsx';
import {GoalDetailsPage} from '../ui/GoalDetailsPage.tsx';
import {GoalListPage} from '../ui/GoalListPage.tsx';
import {GoalTransferPage} from '../ui/GoalTransferPage.tsx';
import {GoalFundPage} from '../ui/GoalFundPage.tsx';
import {GoalWithdrawPage} from '../ui/GoalWithdrawPage.tsx';

const goalListRoute = {
	path: APP_PATH.goalList,
	element: withRouteGuard({page: <GoalListPage />}),
};

const goalDetailsRoute = {
	path: `${APP_PATH.goalDetails}/:goalId`,
	element: withRouteGuard({page: <GoalDetailsPage />}),
};

const goalCreateRoute = {
	path: APP_PATH.createGoal,
	element: withRouteGuard({page: <GoalCreatePage />}),
};

const goalTransferRoute = {
	path: APP_PATH.goalTransfer,
	element: withRouteGuard({page: <GoalTransferPage />}),
};

const goalFundRoute = {
	path: APP_PATH.goalFund,
	element: withRouteGuard({page: <GoalFundPage />}),
};

const goalWithdrawRoute = {
	path: APP_PATH.goalWithdraw,
	element: withRouteGuard({page: <GoalWithdrawPage />}),
};

export const goalRoutes = [
	{element: <AppLayout />, children: [goalListRoute]},
	{
		element: <AppScreenLayout />,
		children: [goalDetailsRoute, goalCreateRoute, goalTransferRoute, goalFundRoute, goalWithdrawRoute],
	},
];
