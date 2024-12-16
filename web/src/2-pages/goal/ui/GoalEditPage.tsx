import {useParams} from 'react-router-dom';
import {GoalDelete, GoalEditDetails, GoalImageField} from '@widgets/goal';
import {APP_PATH} from '@shared/constants';
import {PageHeader} from '@shared/ui';

export function GoalEditPage() {
	const {id} = useParams();

	return (
		<>
			<GoalImageField>
				<PageHeader backPath={APP_PATH.goal.getItemDetailsPath(id)} />
			</GoalImageField>
			<div className='my-6 flex flex-col gap-6 px-4'>
				<GoalEditDetails />
				<GoalDelete />
			</div>
		</>
	);
}
