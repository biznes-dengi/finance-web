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
} from '@shared/ui';
import {textHelpers, useFilter} from '@shared/lib';

import {buttonConfigs, savingStateOptions, type TSavingStateValue} from '../config/savingManagement.config.ts';
import {savingModel} from '@entities/saving';
import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';

const defaultFilter = {
	pageNumber: 0,
	state: undefined as TSavingStateValue,
};

export function SavingManagement() {
	const {filter, setFilter} = useFilter<typeof defaultFilter>({defaultFilter});
	const {
		data: {savings},
		isFetching,
	} = savingModel.useItems(filter);

	return (
		<Box isCard>
			<Box basePadding className='pb-0'>
				<Box className='flex justify-between'>
					<Box>
						<Box
							className='mb-2 text-3xl font-medium'
							isFetching={isFetching}
							preloadWidth={PRELOAD_SIZE.width.xl}
							preloadHeight={PRELOAD_SIZE.height.xl}
						>
							{textHelpers.getAmountWithCurrency(35000, '$')}
						</Box>
						<Box
							className='text-sm font-light text-primary-grey'
							isFetching={isFetching}
							preloadWidth={PRELOAD_SIZE.width.l}
							preloadHeight={PRELOAD_SIZE.height.xs}
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

			<Box basePaddingX className='py-3'>
				<SelectInCard<TSavingStateValue>
					value={filter.state}
					onChange={(value) => setFilter({...filter, state: value})}
					options={savingStateOptions}
					isFetching={isFetching}
				/>
			</Box>

			<List
				isFetching={isFetching}
				rows={savings}
				renderRow={(row) => (
					<Item
						image={
							<ItemImageWithProgress
								image={<div className='size-10 rounded-full bg-green-200' />}
								current={row.balance}
								target={row.targetAmount}
							/>
						}
						name={row.name}
						description={textHelpers.getRatio(row.balance, row.targetAmount, row.currency as CURRENCY)}
						onClick={(navigate) => navigate(APP_PATH.goalDetails)}
					/>
				)}
			/>
		</Box>
	);
}
