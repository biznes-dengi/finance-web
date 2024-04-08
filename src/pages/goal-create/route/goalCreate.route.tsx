import {GoalCreatePage} from '../ui/GoalCreate.page.tsx';

import {APP_PATH} from '@shared/config';

export const goalCreateRoute = {
	path: APP_PATH.createGoal,
	element: <GoalCreatePage />,
};
