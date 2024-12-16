import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {TransactionPage} from '@shared/ui';
import {APP_PATH} from '@shared/constants';

export function GoalDetailsFundPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {fundGoal, isFundGoalLoading, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund();

	return (
		<TransactionPage
			itemDetails={goalDetails}
			isItemDataLoading={isGoalDetailsLoading}
			actionType='fund'
			action={fundGoal}
			isActionLoading={isFundGoalLoading}
			isActionSuccess={isFundGoalSuccess}
			isActionError={isFundGoalError}
			successMessageKey='fundGoalSuccess'
			errorMessageKey='fundGoalError'
			backPath={APP_PATH.goal.getItemDetailsPath(id)}
		/>
	);
}
