import {Button, Item, Management} from '@shared/ui';
import {GoalModel} from '@entities/goal';
import {TextHelpers} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';
import {buttonConfigs} from '@widgets/portfolio/portfolio-management/config/PortfolioManagement.config.tsx';

export function PortfolioManagement() {
	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading;

	return (
		<Management
			isLoading={isLoading}
			totalBalance={goalTotalBalance}
			buttons={buttonConfigs.map((buttonConfig, index) => (
				<Button key={index} isLoading={isLoading} {...buttonConfig}>
					{APP_TEXT.connectWallet}
				</Button>
			))}
			listTitle={'Assets'}
			listItems={goals}
			renderListItem={(goal) => (
				<Item
					image={<div className='size-10 rounded-full bg-green-200' />}
					name={goal.name}
					description={'description'}
					rightName={`${TextHelpers.getAmount(goal.balance.amount)} ${CURRENCY_SYMBOL[goal.balance.currency]}`}
					onClick={(navigate) => navigate(APP_PATH.goal.getItemDetailsPath(goal.id))}
				/>
			)}
			fetchNextListPage={fetchNextGoalsPage}
			hasNextListPage={hasNextGoalsPage}
		/>
	);
}
