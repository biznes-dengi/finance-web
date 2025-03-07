import {useParams} from 'react-router-dom';
import {PageWidgetsWrapper} from '@pages/ui';
import {GoalDelete, GoalEditDetails, GoalImageField} from '@widgets/goal';
import {PageHeader} from '@shared/ui';
import {APP_PATH} from '@shared/constants';

export function GoalEditPage() {
	const {id} = useParams();

	return (
		<>
			<GoalImageField>
				<PageHeader backPath={APP_PATH.goal.getItemDetailsPath(id)} />
			</GoalImageField>
			<PageWidgetsWrapper withTopSpace>
				<GoalEditDetails />
				<GoalDelete />
			</PageWidgetsWrapper>
		</>
	);
}
