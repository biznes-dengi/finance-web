import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';
import {AppScreenLayout, AppLayout} from '@pages/ui';
import {SavingCreatePage} from '../ui/SavingCreatePage.tsx';
import {SavingDetailsPage} from '../ui/SavingDetailsPage.tsx';
import {SavingListPage} from '../ui/SavingListPage.tsx';
import {GoalTransferPage} from '../ui/GoalTransferPage.tsx';
import {GoalFundPage} from '../ui/GoalFundPage.tsx';
import {GoalWithdrawPage} from '../ui/GoalWithdrawPage.tsx';

const goalListRoute = {
	path: APP_PATH.goalList,
	element: withRouteGuard({page: <SavingListPage />}),
};

const goalDetailsRoute = {
	path: APP_PATH.goalDetails,
	element: withRouteGuard({page: <SavingDetailsPage />}),
};

const goalCreateRoute = {
	path: APP_PATH.createGoal,
	element: withRouteGuard({page: <SavingCreatePage />}),
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
