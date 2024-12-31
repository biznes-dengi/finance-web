import {useParams} from 'react-router-dom';
import {FundWithdrawPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export function GoalDetailsFundPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {fundGoal, isFundGoalLoading, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund();

	return (
		<FundWithdrawPage
			itemDetails={goalDetails}
			isItemDataLoading={isGoalDetailsLoading}
			actionType='fund'
			action={fundGoal}
			isActionLoading={isFundGoalLoading}
			isActionSuccess={isFundGoalSuccess}
			isActionError={isFundGoalError}
			successTextKey='fundGoalSuccess'
			errorTextKey='fundGoalError'
			backPath={APP_PATH.goal.getItemDetailsPath(id)}
		/>
	);
}
