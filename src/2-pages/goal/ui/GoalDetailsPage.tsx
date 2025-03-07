import {PageWidgetsWrapper} from '@pages/ui';
import {GoalImage, GoalProgress, GoalTransactions} from '@widgets/goal';

export function GoalDetailsPage() {
	return (
		<>
			<GoalImage />
			<PageWidgetsWrapper withTopSpace>
				<GoalProgress />
				<GoalTransactions />
			</PageWidgetsWrapper>
		</>
	);
}
