import {TransferPage} from '@pages/ui';
import {goalsDefaultFilter} from '@widgets/goal/util';
import {GoalModel} from '@entities/goal';
import {APP_PATH} from '@shared/constants';

export function GoalTransferPage() {
	const {goals, isGoalsLoading} = GoalModel.useItems({filter: goalsDefaultFilter});

	const {transferGoal, isTransferGoalLoading, isTransferGoalSuccess, isTransferGoalError} = GoalModel.useTransfer({
		isFromListPage: true,
	});

	return (
		<TransferPage
			items={goals}
			isItemDataLoading={isGoalsLoading}
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
			backPath={APP_PATH.goalList}
		/>
	);
}
