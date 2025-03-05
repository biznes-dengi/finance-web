import {useParams} from 'react-router-dom';
import {GoalTransactionsHistory} from '@widgets/goal';
import {PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function GoalTransactionsPage() {
	const {id} = useParams();

	return (
		<>
			<PageHeader title={APP_TEXT.transactions} backPath={APP_PATH.goal.getItemDetailsPath(id)} />
			<div className='px-4 pb-6'>
				<GoalTransactionsHistory />
			</div>
		</>
	);
}
