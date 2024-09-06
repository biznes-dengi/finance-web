import {Box, Button, Item, List, SelectInCard} from '@shared/ui';
import {textHelpers, useFilter} from '@shared/lib';

import {buttonConfigs, savingStateOptions, type TSavingStateValue} from '../config/savingManagement.config.ts';
import {savingModel} from '@entities/saving';
import {APP_PATH, APP_TEXT} from '@shared/constants';

const defaultFilter = {
	state: null as TSavingStateValue,
};
type TFilter = typeof defaultFilter;

export function SavingManagement() {
	const {filter, setFilter} = useFilter<TFilter>({defaultFilter});

	const {data} = savingModel.useItems(filter);

	return (
		<Box isCard>
			<Box basePadding>
				<Box className='flex justify-between pb-4'>
					<Box>
						<Box className='mb-1 text-3xl font-semibold'>{textHelpers.getAmountWithCurrency(950, '$')}</Box>
						<Box className='text-sm font-light text-primary-grey'>{APP_TEXT.accumulation}</Box>
					</Box>
					<div role='saving-icon' className='h-10 w-10 rounded-xl bg-secondary-grey' />
				</Box>

				<Box className='flex justify-between'>
					{buttonConfigs.map((buttonConfig) => (
						<Button
							type={buttonConfig.type}
							key={buttonConfig.name}
							icon={buttonConfig.icon}
							onClick={buttonConfig.onClick}
						>
							{buttonConfig.name}
						</Button>
					))}
				</Box>
			</Box>

			<Box basePaddingX className='py-3'>
				<SelectInCard<TSavingStateValue>
					value={filter.state}
					onChange={(value) => setFilter({...filter, state: value})}
					options={savingStateOptions}
				/>
			</Box>

			<List
				rows={data}
				renderRow={(row) => (
					<Item
						icon={<div className='border-2 border-primary-violet bg-secondary-grey' />}
						name={row.title}
						description={textHelpers.getRatio(row.amount, row.targetAmount, row.currencySymbol || '$')}
						onClick={(navigate) => navigate(APP_PATH.goalDetails)}
					/>
				)}
			/>
		</Box>
	);
}
