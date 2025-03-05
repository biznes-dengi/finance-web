import {APP_TEXT} from '@shared/constants';
import {DeleteItem, LoadingWrapper} from '@shared/ui';
import {GoalModel} from '@entities/goal';
import {useParams} from 'react-router-dom';

export function GoalDelete() {
	const {id} = useParams();

	const {deleteGoal, isDeleteGoalPending, isDeleteGoalSuccess, isDeleteGoalError} = GoalModel.useDeleteItem();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	return (
		<DeleteItem
			confirmationTitle={goalDetails?.name as string}
			entityName={APP_TEXT.goal}
			isPending={isDeleteGoalPending}
			isSuccess={isDeleteGoalSuccess}
			isError={isDeleteGoalError}
			handleDelete={() => deleteGoal({params: {id: id!}})}
			successStatusTextKey='deleteGoalSuccess'
			errorStatusTextKey='deleteGoalError'
		>
			<LoadingWrapper isLoading={isGoalDetailsLoading} className='my-0.5 h-4 w-10'>
				{APP_TEXT.deleteGoal}
			</LoadingWrapper>
		</DeleteItem>
	);
}
