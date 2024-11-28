import {
	Box,
	Button,
	ButtonType,
	Card,
	Icon,
	Item,
	ItemImageWithProgress,
	List,
	PRELOAD_SIZE,
	PreloadSkeleton,
	SelectInCard,
} from '@shared/ui';
import {textHelpers, useFilter} from '@shared/lib';
import {buttonConfigs, savingStateOptions, type TSavingStateValue} from '../config/savingManagement.config.ts';
import {goalModel} from '@entities/goal';
import {APP_TEXT, CURRENCY_MAP, getGoalDetailsPath} from '@shared/constants';

const defaultFilter = {
	pageNumber: 0,
	status: undefined as TSavingStateValue,
};

export function SavingManagement() {
	const {filter, setFilter} = useFilter<typeof defaultFilter>({defaultFilter});

	const {totalBalance, isTotalBalanceFetching} = goalModel.useTotalBalance();
	const {items, isItemsFetching} = goalModel.useItems(filter);

	const isFetching = isItemsFetching || isTotalBalanceFetching;

	return (
		<div className='rounded-2xl bg-white'>
			<Box basePadding className='pb-1'>
				<Box className='flex justify-between'>
					<Box>
						<Box
							className='mb-2 text-3xl font-medium'
							isFetching={isFetching}
							preloadWidth={PRELOAD_SIZE.width.xl}
							preloadHeight={PRELOAD_SIZE.height.xl}
							preloadClassName='mt-2 mb-3.5'
						>
							{totalBalance &&
								textHelpers.getAmountWithCurrency(totalBalance.amount, CURRENCY_MAP[totalBalance.currency].symbol)}
						</Box>
						<Box
							className='text-sm font-light text-primary-grey'
							isFetching={isFetching}
							preloadWidth={PRELOAD_SIZE.width.l}
							preloadHeight={PRELOAD_SIZE.height.xs}
							preloadClassName='mb-1'
						>
							{APP_TEXT.totalBalance}
						</Box>
					</Box>
					{!isFetching ? (
						<div className='ml-2 flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary-grey'>
							<div className='size-5'>{Icon.goal}</div>
						</div>
					) : (
						<PreloadSkeleton width={40} height={40} className='rounded-xl' />
					)}
				</Box>
			</Box>

			<Box basePadding className='flex justify-between'>
				{buttonConfigs.map((buttonConfig) => (
					<Button
						type={ButtonType.icon}
						key={buttonConfig.name}
						icon={buttonConfig.icon}
						onClick={buttonConfig.onClick}
						isFetching={isFetching}
					>
						{buttonConfig.name}
					</Button>
				))}
			</Box>

			<Card
				titleInCard={
					<SelectInCard<TSavingStateValue>
						value={filter.status}
						onChange={(value) => setFilter({...filter, status: value})}
						options={savingStateOptions}
						isFetching={isFetching}
					/>
				}
			>
				<List
					isFetching={isFetching}
					rows={items}
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
								row.targetAmount && textHelpers.getRatio(row.balance.amount, row.targetAmount, row.balance.currency)
							}
							onClick={(navigate) => navigate(getGoalDetailsPath(row.id))}
						/>
					)}
				/>
			</Card>
		</div>
	);
}
