import {GoalImage, GoalProgress, GoalTransactions} from '@widgets/goal';

export function GoalDetailsPage() {
	return (
		<>
			<GoalImage />
			<div className='my-6 flex flex-col gap-6 px-4'>
				<GoalProgress />
				<GoalTransactions />
			</div>
		</>
	);
}
