import {GoalModel} from '@entities/goal';
import {buttonConfigs, settingsConfigs} from '../config/PortfolioManagement.config.tsx';
import {Item, Management} from '@shared/ui';
import {TextHelpers} from '@shared/lib';
import {APP_PATH, CURRENCY_SYMBOL} from '@shared/constants';

export function PortfolioManagement() {
	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading;

	return (
		<Management
			isLoading={isLoading}
			totalBalance={goalTotalBalance}
			settingsConfigs={settingsConfigs}
			buttonConfigs={buttonConfigs}
			listTitle='Tokens'
			listItems={goals}
			renderListItem={(goal) => (
				<Item
					image={<div className='size-10 rounded-full bg-green-200' />}
					name={goal.name}
					description={'description'}
					rightName={`${TextHelpers.getAmount(goal.balance.amount)} ${CURRENCY_SYMBOL[goal.balance.currency]}`}
					onClick={({navigate}) => navigate(APP_PATH.goal.getItemDetailsPath(goal.id))}
				/>
			)}
			fetchNextListPage={fetchNextGoalsPage}
			hasNextListPage={hasNextGoalsPage}
			emptyListTextKey='tokens'
		/>
	);
}
