import {useParams} from 'react-router-dom';
import {TransferPage} from '@pages/ui';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export function GoalDetailsTransferPage() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {goals, isGoalsLoading, fetchNextGoalsPage, hasNextGoalsPage} = GoalModel.useItems();

	const {transferGoal, isTransferGoalLoading, isTransferGoalSuccess, isTransferGoalError} = GoalModel.useTransfer();

	return (
		<TransferPage
			itemDetails={goalDetails}
			items={goals}
			fetchNextOptions={fetchNextGoalsPage}
			hasNextOptions={hasNextGoalsPage}
			isItemDataLoading={isGoalsLoading || isGoalDetailsLoading}
			transfer={(transferProps) => {
				transferGoal({
					payload: {
						fromGoalId: transferProps.payload.fromItemId,
						fromGoalAmount: transferProps.payload.fromItemAmount,
						toGoalId: transferProps.payload.toItemId,
						toGoalAmount: transferProps.payload.toItemAmount,
						date: transferProps.payload.date,
					},
				});
			}}
			isTransferLoading={isTransferGoalLoading}
			isTransferSuccess={isTransferGoalSuccess}
			isTransferError={isTransferGoalError}
			successTextKey='transferGoalSuccess'
			errorTextKey='transferGoalError'
			backPath={APP_PATH.goal.getItemDetailsPath(id)}
		/>
	);
}
