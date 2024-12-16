import {GoalModel} from '@entities/goal';
import {TransactionPage} from '@shared/ui';
import {APP_PATH} from '@shared/constants';

export function GoalWithdrawPage() {
	const {goals, isGoalsLoading} = GoalModel.useItems({filter: {pageNumber: 0}});
	const {withdrawGoal, isWithdrawGoalLoading, isWithdrawGoalSuccess, isWithdrawGoalError} = GoalModel.useWithdraw();

	return (
		<TransactionPage
			actionType='withdraw'
			items={goals}
			isItemDataLoading={isGoalsLoading}
			action={withdrawGoal}
			isActionLoading={isWithdrawGoalLoading}
			isActionSuccess={isWithdrawGoalSuccess}
			isActionError={isWithdrawGoalError}
			successMessageKey='withdrawGoalSuccess'
			errorMessageKey='withdrawGoalError'
			backPath={APP_PATH.goalList}
		/>
	);
}
