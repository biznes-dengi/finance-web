import {GoalDetailsPage} from '../ui/GoalDetailsPage.tsx';

import {APP_PATH} from '@shared/config';
import {withRouteGuard} from '@shared/lib';

export const goalDetailsRoute = {
	path: APP_PATH.goalDetails,
	element: withRouteGuard({page: <GoalDetailsPage />}),
};
