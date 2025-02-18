import {APP_PATH} from '@shared/constants';
import {PrivateRoute} from '@shared/lib';
import {FullScreenPageLayout, AppLayout} from '@pages/ui';
import {GoalCreatePage} from '../ui/GoalCreatePage.tsx';
import {GoalDetailsPage} from '../ui/GoalDetailsPage.tsx';
import {GoalListPage} from '../ui/GoalListPage.tsx';
import {GoalTransferPage} from '../ui/GoalTransferPage.tsx';
import {GoalFundPage} from '../ui/GoalFundPage.tsx';
import {GoalWithdrawPage} from '../ui/GoalWithdrawPage.tsx';
import {GoalEditPage} from '@pages/goal/ui/GoalEditPage.tsx';
import {GoalTransactionsPage} from '@pages/goal/ui/GoalTransactionsPage.tsx';
import {GoalDetailsFundPage} from '@pages/goal/ui/GoalDetailsFundPage.tsx';
import {GoalDetailsWithdrawPage} from '@pages/goal/ui/GoalDetailsWithdrawPage.tsx';
import {GoalDetailsTransferPage} from '@pages/goal/ui/GoalDetailsTransferPage.tsx';

const goalListRoute = {
	path: APP_PATH.home,
	element: <PrivateRoute page={<GoalListPage />} />,
};

const goalCreateRoute = {
	path: APP_PATH.goal.create,
	element: <PrivateRoute page={<GoalCreatePage />} />,
};

const goalTransferRoute = {
	path: APP_PATH.goal.transfer,
	element: <PrivateRoute page={<GoalTransferPage />} />,
};

const goalFundRoute = {
	path: APP_PATH.goal.fund,
	element: <PrivateRoute page={<GoalFundPage />} />,
};

const goalWithdrawRoute = {
	path: APP_PATH.goal.withdraw,
	element: <PrivateRoute page={<GoalWithdrawPage />} />,
};

const goalDetailsRoute = {
	path: `${APP_PATH.goal.details}/:id`,
	element: <PrivateRoute page={<GoalDetailsPage />} />,
};

const goalDetailsFundRoute = {
	path: `${APP_PATH.goal.details}/:id/fund`,
	element: <PrivateRoute page={<GoalDetailsFundPage />} />,
};

const goalDetailsWithdrawRoute = {
	path: `${APP_PATH.goal.details}/:id/withdraw`,
	element: <PrivateRoute page={<GoalDetailsWithdrawPage />} />,
};

const goalEditRoute = {
	path: `${APP_PATH.goal.details}/:id/edit`,
	element: <PrivateRoute page={<GoalEditPage />} />,
};

const goalTransactionsRoute = {
	path: `${APP_PATH.goal.details}/:id/transactions`,
	element: <PrivateRoute page={<GoalTransactionsPage />} />,
};

const goalDetailsTransferRoute = {
	path: `${APP_PATH.goal.details}/:id/transfer`,
	element: <PrivateRoute page={<GoalDetailsTransferPage />} />,
};

export const goalRoutes = [
	{element: <AppLayout />, children: [goalListRoute]},
	{
		element: <FullScreenPageLayout />,
		children: [
			goalDetailsRoute,
			goalCreateRoute,
			goalTransferRoute,
			goalFundRoute,
			goalWithdrawRoute,
			goalEditRoute,
			goalTransactionsRoute,
			goalDetailsFundRoute,
			goalDetailsWithdrawRoute,
			goalDetailsTransferRoute,
		],
	},
];
