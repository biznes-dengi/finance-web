import {GoalModel} from '@entities/goal';
import {buttonConfigs} from '../config/PortfolioManagement.config.tsx';
import {Item, Management} from '@shared/ui';
import {TextHelpers} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function PortfolioManagement() {
	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading;

	return (
		<Management
			isLoading={isLoading}
			totalBalance={goalTotalBalance}
			totalBalanceDescription={
				<div className='flex items-center gap-1.5 text-red-600'>
					<div>-1 700$</div>
					<div className='size-0.5 rounded-full bg-red-600' />
					<div>30%</div>
				</div>
			}
			buttonConfigs={buttonConfigs}
			listTitle={APP_TEXT.assets}
			listItems={goals}
			renderListItem={(goal) => (
				<Item
					image={<div className='size-10 rounded-full bg-green-200' />}
					imageIcon={<div className='size-2 bg-secondary-violet' />}
					name={goal.name}
					description='0.1354$'
					rightName={`${TextHelpers.getAmount(goal.balance.amount)} ${CURRENCY_SYMBOL[goal.balance.currency]}`}
					rightDescription={
						<div className='flex items-center gap-1.5 text-red-600'>
							<div>-1 700$</div>
							<div className='size-0.5 rounded-full bg-red-600' />
							<div>30%</div>
						</div>
					}
					onClick={({navigate}) => navigate(APP_PATH.goal.getItemDetailsPath(goal.id))}
				/>
			)}
			fetchNextListPage={fetchNextGoalsPage}
			hasNextListPage={hasNextGoalsPage}
			emptyListTextKey='assets'
		/>
	);
}
