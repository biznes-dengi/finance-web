import {APP_TEXT} from '@shared/constants';
import {DeleteItem, LoadingWrapper} from '@shared/ui';
import {GoalModel} from '@entities/goal';
import {useParams} from 'react-router-dom';

export function GoalDelete() {
	const {id} = useParams();
	const {deleteGoal, isDeleteGoalLoading, isDeleteGoalSuccess, isDeleteGoalError} = GoalModel.useDeleteItem();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	return (
		<DeleteItem
			title={goalDetails?.name as string}
			confirmationText={APP_TEXT.deleteGoalConfirmation}
			isLoading={isDeleteGoalLoading}
			isSuccess={isDeleteGoalSuccess}
			isError={isDeleteGoalError}
			handleDelete={() => deleteGoal({params: {id: id!}})}
		>
			<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
				{APP_TEXT.deleteGoal}
			</LoadingWrapper>
		</DeleteItem>
	);
}
