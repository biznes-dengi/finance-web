import {Box, Button, Card, Item, ItemImageWithProgress, List, PRELOAD_SIZE, SelectInCard} from '@shared/ui';
import {textHelpers, useFilter} from '@shared/lib';
import {
	buttonConfigs,
	defaultFilter,
	goalStatusOptions,
	type GoalStatusValue,
} from '../config/GoalManagement.config.tsx';
import {GoalModel} from '@entities/goal';
import {APP_TEXT, CURRENCY_MAP, getGoalDetailsPath} from '@shared/constants';

export function GoalManagement() {
	const {filter, setFilter} = useFilter<typeof defaultFilter>({defaultFilter});

	const {totalBalance, isTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {itemList, isItemListLoading} = GoalModel.useItemList({filter});

	const isLoading = isItemListLoading || isTotalBalanceLoading;

	return (
		<Card>
			<div className='flex justify-between p-4'>
				<div className='flex flex-col gap-2'>
					<Box
						isLoading={isLoading}
						preloadWidth={PRELOAD_SIZE.width.xl}
						preloadHeight={PRELOAD_SIZE.height.xl}
						preloadClassName='mt-2 mb-1.5'
					>
						{totalBalance && (
							<span className='text-3xl font-medium'>
								{textHelpers.getAmountWithCurrency(totalBalance.amount, CURRENCY_MAP[totalBalance.currency].symbol)}
							</span>
						)}
					</Box>
					<Box
						className='text-sm font-light text-primary-grey'
						isLoading={isLoading}
						preloadWidth={PRELOAD_SIZE.width.l}
						preloadHeight={PRELOAD_SIZE.height.xs}
						preloadClassName='mb-1'
					>
						{APP_TEXT.totalBalance}
					</Box>
				</div>

				<Box
					className='ml-2 flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-200'
					isLoading={isLoading}
					preloadWidth={40}
					preloadHeight={40}
					preloadClassName='rounded-xl'
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
				<SelectInCard<GoalStatusValue>
					value={filter.status}
					onChange={(value) => setFilter({...filter, status: value})}
					options={goalStatusOptions}
					isLoading={isLoading}
				/>
			</div>

			<List
				isLoading={isLoading}
				rows={itemList}
				renderRow={(row) => (
					<Item
						name={row.name}
						description={
							row.targetAmount && textHelpers.getRatio(row.balance.amount, row.targetAmount, row.balance.currency)
						}
						onClick={(navigate) => navigate(getGoalDetailsPath(row.id))}
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
					/>
				)}
				emptyStateEntity={APP_TEXT.goals}
			/>
		</Card>
	);
}
