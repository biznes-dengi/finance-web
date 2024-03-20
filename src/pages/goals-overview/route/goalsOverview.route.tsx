import {GoalOverviewPage} from '../ui/GoalOverview.page.tsx';

import {APP_PATH} from '@shared/constants';
import {withRouteGuard} from '@shared/lib';

export const goalsOverviewRoute = {
	path: APP_PATH.root,
	element: withRouteGuard({page: <GoalOverviewPage />}),
};
