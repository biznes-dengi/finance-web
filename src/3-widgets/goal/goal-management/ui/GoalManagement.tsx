import {Button, Card, Item, ItemImageWithProgress, List, LoadingWrapper, SelectInCard} from '@shared/ui';
import {buttonConfigs, defaultFilter, goalStatusOptions} from '../config/GoalManagement.config.tsx';
import {GoalModel} from '@entities/goal';
import {TextHelpers, useFilter} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function GoalManagement() {
	const {filter, setFilter} = useFilter<typeof defaultFilter>({defaultFilter});

	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading} = GoalModel.useItems({filter});

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading;

	return (
		<Card>
			<div className='flex justify-between p-4'>
				<div className='flex flex-col gap-1.5'>
					<LoadingWrapper isLoading={isLoading} className='mb-1.5 mt-2 h-6 w-32'>
						{goalTotalBalance &&
							(() => {
								const [int, float] = TextHelpers.getAmount(goalTotalBalance.amount).split(',');
								return (
									<div>
										<span className='text-3xl font-medium'>
											<span>{int}</span>
											{!float && <span> {CURRENCY_SYMBOL[goalTotalBalance.currency]}</span>}
										</span>
										{float && (
											<span className='text-xl font-bold'>
												,{float} {CURRENCY_SYMBOL[goalTotalBalance.currency]}
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

			<div className='flex justify-between px-4 py-2'>
				{buttonConfigs.map(({name, ...restButtonConfig}, index) => (
					<Button key={index} isLoading={isLoading} {...restButtonConfig}>
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
				/>
			</div>

			<List
				emptyTextKey='goals'
				isLoading={isLoading}
				rows={goals}
				renderRow={(row) => (
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
							row.targetAmount &&
							`${APP_TEXT.target}: ${TextHelpers.getAmount(row.targetAmount)} ${CURRENCY_SYMBOL[row.balance.currency]}`
						}
						rightName={`${TextHelpers.getAmount(row.balance.amount)} ${CURRENCY_SYMBOL[row.balance.currency]}`}
						onClick={(navigate) => navigate(APP_PATH.goal.getItemDetailsPath(row.id))}
					/>
				)}
			/>
		</Card>
	);
}
