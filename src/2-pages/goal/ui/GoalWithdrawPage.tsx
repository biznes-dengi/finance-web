import {FundWithdrawPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export function GoalWithdrawPage() {
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const {withdrawGoal, isWithdrawGoalLoading, isWithdrawGoalSuccess, isWithdrawGoalError} = GoalModel.useWithdraw({
		isFromListPage: true,
	});

	return (
		<FundWithdrawPage
			actionType='withdraw'
			items={goals}
			fetchNextOptions={fetchNextGoalsPage}
			hasNextOptions={hasNextGoalsPage}
			isItemDataLoading={isGoalsLoading}
			action={withdrawGoal}
			isActionLoading={isWithdrawGoalLoading}
			isActionSuccess={isWithdrawGoalSuccess}
			isActionError={isWithdrawGoalError}
			successTextKey='withdrawGoalSuccess'
			errorTextKey='withdrawGoalError'
			backPath={APP_PATH.goal.list}
		/>
	);
}
