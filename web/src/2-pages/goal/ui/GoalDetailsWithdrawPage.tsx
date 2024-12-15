import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {TransactionPage} from '@pages/goal/ui/TransactionPage.tsx';

export function GoalDetailsWithdrawPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {withdrawGoal, isWithdrawGoalLoading, isWithdrawGoalSuccess, isWithdrawGoalError} = GoalModel.useWithdraw();

	return (
		<TransactionPage
			details={goalDetails}
			isDetailsLoading={isGoalDetailsLoading}
			actionType='withdraw'
			action={withdrawGoal}
			isActionLoading={isWithdrawGoalLoading}
			isActionSuccess={isWithdrawGoalSuccess}
			isActionError={isWithdrawGoalError}
			successMessageKey='withdrawGoalSuccess'
			errorMessageKey='withdrawGoalError'
		/>
	);
}
