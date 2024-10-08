import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';
import {AppScreenLayout, AppLayout} from '@pages/ui';
import {SavingCreatePage} from '../ui/SavingCreatePage.tsx';
import {SavingDetailsPage} from '../ui/SavingDetailsPage.tsx';
import {SavingListPage} from '../ui/SavingListPage.tsx';
import {SavingTransferPage} from '../ui/SavingTransferPage.tsx';
import {GoalFundPage} from '../ui/GoalFundPage.tsx';
import {GoalWithdrawPage} from '../ui/GoalWithdrawPage.tsx';

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

const goalFundRoute = {
	path: APP_PATH.goalFund,
	element: withRouteGuard({page: <GoalFundPage />}),
};

const goalWithdrawRoute = {
	path: APP_PATH.goalWithdraw,
	element: withRouteGuard({page: <GoalWithdrawPage />}),
};

export const savingRoutes = [
	{element: <AppLayout />, children: [savingListRoute]},
	{
		element: <AppScreenLayout />,
		children: [savingDetailsRoute, savingCreateRoute, savingTransferRoute, goalFundRoute, goalWithdrawRoute],
	},
];
