import {Button, Card, Item, ItemImageWithProgress, List, LoadingWrapper, SelectInCard} from '@shared/ui';
import {buttonConfigs, goalStatusOptions} from '../config/GoalManagement.config.tsx';
import {goalsDefaultFilter} from '@widgets/goal/util';
import {GoalModel} from '@entities/goal';
import {TextHelpers, useFilter} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function GoalManagement() {
	const {filter, setFilter} = useFilter<typeof goalsDefaultFilter>({defaultFilter: goalsDefaultFilter});

	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems({filter});
	const {goals: allGoals, isGoalsLoading: isAllGoalsLoading} = GoalModel.useItems({filter: goalsDefaultFilter});

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading || isAllGoalsLoading;

	return (
		<Card>
			<div className='flex justify-between p-4'>
				<div className='flex flex-col gap-1.5'>
					<LoadingWrapper isLoading={isLoading} className='mb-1.5 mt-2 h-6 w-32'>
						{goalTotalBalance &&
							(() => {
								const [int, float] = TextHelpers.getAmount(goalTotalBalance.amount).split('.');
								return (
									<div>
										<span className='text-3xl font-[600]'>
											<span>{int}</span>
											{!float && <span> {CURRENCY_SYMBOL[goalTotalBalance.currency]}</span>}
										</span>
										{float && (
											<span className='text-xl font-bold'>
												.{float} {CURRENCY_SYMBOL[goalTotalBalance.currency]}
											</span>
										)}
									</div>
								);
							})()}
					</LoadingWrapper>
					<LoadingWrapper isLoading={isLoading} className='mb-1 h-[14px] w-16'>
						<span className='text-sm font-light text-primary-grey'>{APP_TEXT.totalBalance}</span>
					</LoadingWrapper>
				</div>

				<LoadingWrapper isLoading={isLoading} className='mb-1 size-10 rounded-xl'>
					<div className='ml-2 flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-200' />
				</LoadingWrapper>
			</div>

			<div className='flex justify-between px-4 pb-2 pt-1'>
				{buttonConfigs.map(({name, ...restButtonConfig}, index) => (
					<Button
						key={index}
						isLoading={isLoading}
						disabled={(() => {
							if (name === APP_TEXT.transfer) {
								return allGoals?.length ? allGoals.length <= 1 : true;
							}

							if (name === APP_TEXT.fund || name === APP_TEXT.withdraw) {
								return !allGoals?.length;
							}
						})()}
						{...restButtonConfig}
					>
						{name}
					</Button>
				))}
			</div>

			<div className='px-4 py-3'>
				<SelectInCard<(typeof goalStatusOptions)[number]['value']>
					value={filter.status}
					onChange={(value) => setFilter({...filter, status: value})}
					options={goalStatusOptions}
					isLoading={isLoading}
					title={APP_TEXT.goals}
				/>
			</div>

			<List
				emptyTextKey='goals'
				isLoading={isLoading}
				items={goals}
				renderItem={(row) => (
					<Item
						image={
							row.targetAmount ? (
								<ItemImageWithProgress
									image={<div className='size-10 rounded-full bg-green-200' />}
									current={row.balance.amount}
									target={row.targetAmount}
								/>
							) : (
								<div className='size-10 rounded-full bg-green-200' />
							)
						}
						name={row.name}
						description={
							row.targetAmount && row.targetAmount > row.balance.amount
								? `${APP_TEXT.left}: ${TextHelpers.getAmount(row.targetAmount - row.balance.amount)} ${
										CURRENCY_SYMBOL[row.balance.currency]
								  }`
								: APP_TEXT.goalAchieved
						}
						rightName={`${TextHelpers.getAmount(row.balance.amount)} ${CURRENCY_SYMBOL[row.balance.currency]}`}
						onClick={(navigate) => navigate(APP_PATH.goal.getItemDetailsPath(row.id))}
					/>
				)}
				fetchNextPage={fetchNextGoalsPage}
				hasNextPage={hasNextGoalsPage}
			/>
		</Card>
	);
}
