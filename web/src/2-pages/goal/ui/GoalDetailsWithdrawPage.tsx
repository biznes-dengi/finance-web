import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {TransactionPage} from '@shared/ui';
import {APP_PATH} from '@shared/constants';

export function GoalDetailsWithdrawPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {withdrawGoal, isWithdrawGoalLoading, isWithdrawGoalSuccess, isWithdrawGoalError} = GoalModel.useWithdraw();

	return (
		<TransactionPage
			itemDetails={goalDetails}
			isItemDataLoading={isGoalDetailsLoading}
			actionType='withdraw'
			action={withdrawGoal}
			isActionLoading={isWithdrawGoalLoading}
			isActionSuccess={isWithdrawGoalSuccess}
			isActionError={isWithdrawGoalError}
			successMessageKey='withdrawGoalSuccess'
			errorMessageKey='withdrawGoalError'
			backPath={APP_PATH.goal.getItemDetailsPath(id)}
		/>
	);
}
