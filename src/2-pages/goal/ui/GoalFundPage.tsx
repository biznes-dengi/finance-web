import {FundWithdrawPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export function GoalFundPage() {
	const {goals, isGoalsLoading, fetchNextGoalsPage, hasNextGoalsPage} = GoalModel.useItems();

	const {fundGoal, isFundGoalLoading, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund({isFromListPage: true});

	return (
		<FundWithdrawPage
			actionType='fund'
			items={goals}
			fetchNextOptions={fetchNextGoalsPage}
			hasNextOptions={hasNextGoalsPage}
			isItemDataLoading={isGoalsLoading}
			action={fundGoal}
			isActionLoading={isFundGoalLoading}
			isActionSuccess={isFundGoalSuccess}
			isActionError={isFundGoalError}
			successTextKey='fundGoalSuccess'
			errorTextKey='fundGoalError'
			backPath={APP_PATH.goal.list}
		/>
	);
}
