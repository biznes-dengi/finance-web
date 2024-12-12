import {Box, Button, Card, Item, ItemImageWithProgress, List, SelectInCard} from '@shared/ui';
import {buttonConfigs, defaultFilter, goalStatusOptions} from '../config/GoalManagement.config.tsx';
import {GoalModel} from '@entities/goal';
import {TextHelpers, useFilter} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

export function GoalManagement() {
	const {filter, setFilter} = useFilter<typeof defaultFilter>({defaultFilter});

	const {totalBalance, isTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading} = GoalModel.useItems({filter});

	const isLoading = isTotalBalanceLoading || isGoalsLoading;

	return (
		<Card>
			<div className='flex justify-between p-4'>
				<div className='flex flex-col gap-1.5'>
					<Box isLoading={isLoading} loadingSkeletonClassName='w-32 h-6 mt-2 mb-1.5'>
						{totalBalance &&
							(() => {
								const [int, float] = TextHelpers.getAmount(totalBalance.amount).split(',');
								return (
									<div>
										<span className='text-3xl font-medium'>
											<span>{int}</span>
											{!float && <span> {CURRENCY_SYMBOL[totalBalance.currency]}</span>}
										</span>
										{float && (
											<span className='text-xl font-bold'>
												,{float} {CURRENCY_SYMBOL[totalBalance.currency]}
											</span>
										)}
									</div>
								);
							})()}
					</Box>
					<Box
						className='text-sm font-light text-primary-grey'
						isLoading={isLoading}
						loadingSkeletonClassName='w-16 h-[14px] mb-1'
					>
						{APP_TEXT.totalBalance}
					</Box>
				</div>

				<Box
					className='ml-2 flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-200'
					isLoading={isLoading}
					loadingSkeletonClassName='size-10 rounded-xl'
				/>
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
