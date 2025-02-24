import {Item, ItemImageWithProgress, Management, SelectInCard} from '@shared/ui';
import {buttonConfigs, goalStatusOptions} from '../config/GoalManagement.config.tsx';
import {goalsDefaultFilter} from '@widgets/goal/util';
import {GoalModel} from '@entities/goal';
import {TextHelpers, useFilter} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function GoalManagement() {
	const {filter, setFilter} = useFilter<typeof goalsDefaultFilter>({defaultFilter: goalsDefaultFilter});

	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems({filter});
	const {goals: allGoals, isGoalsLoading: isAllGoalsLoading} = GoalModel.useItems({queryKey: 'all'});

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading || isAllGoalsLoading;

	return (
		<Management
			isLoading={isLoading}
			totalBalance={goalTotalBalance}
			totalBalanceDescription={APP_TEXT.totalBalance}
			buttonConfigs={buttonConfigs.map((buttonConfig) => ({
				...buttonConfig,
				disabled: (() => {
					if (buttonConfig.name === APP_TEXT.transfer) {
						return allGoals?.length ? allGoals.length <= 1 : true;
					}

					if (buttonConfig.name === APP_TEXT.fund || buttonConfig.name === APP_TEXT.withdraw) {
						return !allGoals?.length;
					}
				})(),
			}))}
			listTitle={
				<SelectInCard<(typeof goalStatusOptions)[number]['value']>
					value={filter.status}
					onChange={(value) => setFilter({...filter, status: value})}
					options={goalStatusOptions}
					isLoading={isLoading}
					title={APP_TEXT.goals}
				/>
			}
			listItems={goals}
			renderListItem={(goal) => (
				<Item
					image={
						goal.targetAmount ? (
							<ItemImageWithProgress
								image={<div className='size-10 rounded-full bg-green-200' />}
								current={goal.balance.amount}
								target={goal.targetAmount}
							/>
						) : (
							<div className='size-10 rounded-full bg-green-200' />
						)
					}
					name={goal.name}
					description={
						goal.targetAmount && goal.targetAmount > goal.balance.amount
							? `${APP_TEXT.left}: ${TextHelpers.getAmount(goal.targetAmount - goal.balance.amount)} ${
									CURRENCY_SYMBOL[goal.balance.currency]
							  }`
							: APP_TEXT.goalAchieved
					}
					rightName={`${TextHelpers.getAmount(goal.balance.amount)} ${CURRENCY_SYMBOL[goal.balance.currency]}`}
					onClick={({navigate}) => navigate(APP_PATH.goal.getItemDetailsPath(goal.id))}
				/>
			)}
			fetchNextListPage={fetchNextGoalsPage}
			hasNextListPage={hasNextGoalsPage}
			emptyListTextKey='goals'
			isButtonsSpaceBetween
		/>
	);
}
