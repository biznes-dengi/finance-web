import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {TransactionPage} from '@pages/goal/ui/TransactionPage.tsx';

export function GoalDetailsFundPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {fundGoal, isFundGoalLoading, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund();

	return (
		<TransactionPage
			details={goalDetails}
			isDetailsLoading={isGoalDetailsLoading}
			actionType='fund'
			action={fundGoal}
			isActionLoading={isFundGoalLoading}
			isActionSuccess={isFundGoalSuccess}
			isActionError={isFundGoalError}
			successMessageKey='fundGoalSuccess'
			errorMessageKey='fundGoalError'
		/>
	);
}
