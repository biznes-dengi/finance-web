import {GoalModel} from '@entities/goal';
import {TransactionPage} from '@shared/ui';
import {APP_PATH} from '@shared/constants';

export function GoalFundPage() {
	const {goals, isGoalsLoading} = GoalModel.useItems({filter: {pageNumber: 0}});
	const {fundGoal, isFundGoalLoading, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund();

	return (
		<TransactionPage
			actionType='fund'
			items={goals}
			isItemDataLoading={isGoalsLoading}
			action={fundGoal}
			isActionLoading={isFundGoalLoading}
			isActionSuccess={isFundGoalSuccess}
			isActionError={isFundGoalError}
			successMessageKey='fundGoalSuccess'
			errorMessageKey='fundGoalError'
			backPath={APP_PATH.goalList}
		/>
	);
}
