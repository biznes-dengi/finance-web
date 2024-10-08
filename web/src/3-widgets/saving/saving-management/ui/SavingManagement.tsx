import {
	Box,
	Button,
	ButtonType,
	Item,
	List,
	PRELOAD_SIZE,
	PreloadSkeleton,
	ItemImageWithProgress,
	SelectInCard,
	Card,
} from '@shared/ui';
import {textHelpers, useFilter} from '@shared/lib';
import {buttonConfigs, savingStateOptions, type TSavingStateValue} from '../config/savingManagement.config.ts';
import {savingModel} from '@entities/saving';
import {APP_PATH, APP_TEXT, CURRENCY_MAP} from '@shared/constants';

const defaultFilter = {
	pageNumber: 0,
	status: undefined as TSavingStateValue,
};

export function SavingManagement() {
	const {filter, setFilter} = useFilter<typeof defaultFilter>({defaultFilter});

	const {items, isItemsFetching} = savingModel.useItems(filter);
	const {balance, isBalanceFetching} = savingModel.useTotalBalance();

	const isFetching = isBalanceFetching || isItemsFetching;

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
							{balance && textHelpers.getAmountWithCurrency(balance.amount, CURRENCY_MAP[balance.currency].symbol)}
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
						<div role='saving-icon' className='size-10 rounded-xl bg-secondary-grey' />
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
										current={row.balanceResponse.amount}
										target={row.targetAmount}
									/>
								) : (
									<div className='size-10 rounded-full bg-green-200' />
								)
							}
							name={row.name}
							description={
								row.targetAmount &&
								textHelpers.getRatio(row.balanceResponse.amount, row.targetAmount, row.balanceResponse.currency)
							}
							onClick={(navigate) => navigate(APP_PATH.goalDetails)}
						/>
					)}
				/>
			</Card>
		</div>
	);
}
