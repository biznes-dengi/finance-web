import {FundWithdrawPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export function GoalFundPage() {
	const {goals, isGoalsLoading} = GoalModel.useItems({filter: {pageNumber: 0}});

	const {fundGoal, isFundGoalLoading, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund({isFromListPage: true});

	return (
		<FundWithdrawPage
			actionType='fund'
			items={goals}
			isItemDataLoading={isGoalsLoading}
			action={fundGoal}
			isActionLoading={isFundGoalLoading}
			isActionSuccess={isFundGoalSuccess}
			isActionError={isFundGoalError}
			successTextKey='fundGoalSuccess'
			errorTextKey='fundGoalError'
			backPath={APP_PATH.goalList}
		/>
	);
}
