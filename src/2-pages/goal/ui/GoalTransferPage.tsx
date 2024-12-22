import {TransferPage} from '@pages/ui';
import {APP_PATH} from '@shared/constants';
import {GoalModel} from '@entities/goal';

export function GoalTransferPage() {
	const {goals, isGoalsLoading} = GoalModel.useItems({filter: {pageNumber: 0}});

	const {transferGoal, isTransferGoalLoading, isTransferGoalSuccess, isTransferGoalError} = GoalModel.useTransfer({
		isFromListPage: true,
	});

	return (
		<TransferPage
			items={goals}
			isItemDataLoading={isGoalsLoading}
			transfer={transferGoal}
			isTransferLoading={isTransferGoalLoading}
			isTransferSuccess={isTransferGoalSuccess}
			isTransferError={isTransferGoalError}
			successTextKey='transferGoalSuccess'
			errorTextKey='transferGoalError'
			backPath={APP_PATH.goalList}
		/>
	);
}
