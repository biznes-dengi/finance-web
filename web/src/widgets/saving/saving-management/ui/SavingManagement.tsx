import {Box, Button, ButtonType, Item, List, SelectInCard} from '@shared/ui';
import {textHelpers, useFilter} from '@shared/lib';

import {buttonConfigs, savingStateOptions, type TSavingStateValue} from '../config/savingManagement.config.ts';
import {savingModel} from '@entities/saving';
import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';

const defaultFilter = {
	pageNumber: 0,
	state: 'ALL' as TSavingStateValue,
};

export function SavingManagement() {
	const {filter, setFilter} = useFilter<typeof defaultFilter>({defaultFilter});
	const {
		data: {savings},
	} = savingModel.useItems(filter);

	return (
		<Box isCard>
			<Box basePadding className='pb-0'>
				<Box className='flex justify-between'>
					<Box>
						<Box className='mb-2 text-3xl font-medium'>{textHelpers.getAmountWithCurrency(35000, '$')}</Box>
						<Box className='text-sm font-light text-primary-grey'>{APP_TEXT.totalBalance}</Box>
					</Box>
					<div role='saving-icon' className='h-10 w-10 rounded-xl bg-secondary-grey' />
				</Box>
			</Box>

			<Box basePadding className='flex justify-between'>
				{buttonConfigs.map((buttonConfig) => (
					<Button
						type={ButtonType.icon}
						key={buttonConfig.name}
						icon={buttonConfig.icon}
						onClick={buttonConfig.onClick}
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
				/>
			</Box>

			<List
				rows={savings}
				renderRow={(row) => (
					<Item
						icon={<div className='border-2 border-primary-violet bg-secondary-grey' />}
						name={row.name}
						description={textHelpers.getRatio(row.balance, row.targetAmount, row.currency as CURRENCY)}
						onClick={(navigate) => navigate(APP_PATH.goalDetails)}
					/>
				)}
			/>
		</Box>
	);
}
