import {GoalOverviewPage} from '../ui/GoalOverview.page.tsx';

import {APP_PATH} from '@shared/config';
import {withRouteGuard} from '@shared/lib';

export const goalsOverviewRoute = {
	path: APP_PATH.root,
	element: withRouteGuard({page: <GoalOverviewPage />}),
};
