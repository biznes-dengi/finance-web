import {GoalOverview} from '../ui/GoalOverview.tsx';

import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';

export const goalsOverviewRoute = {
	path: APP_PATH.root,
	element: withRouteGuard({page: <GoalOverview />}),
};
