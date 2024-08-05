import {Box, Button, Item, List} from '@shared/ui';

import {buttonConfigs} from '../config/savingManagement.config.ts';
import {goalModel} from '@entities/goal';
import {APP_PATH, APP_TEXT} from '@shared/config';
import {textHelpers} from '@shared/lib';

export function SavingManagement() {
	const {rows, goalItem} = goalModel.useData();

	return (
		<Box isCard>
			<Box basePadding className='pb-0'>
				<Box className='flex justify-between pb-4'>
					<Box>
						<Box className='mb-1 text-3xl font-semibold'>
							{textHelpers.getAmountWithCurrency(goalItem.amount, goalItem.currencySymbol)}
						</Box>
						<Box className='text-sm font-light text-primary-grey'>{APP_TEXT.accumulation}</Box>
					</Box>
					<div role='saving-icon' className='h-10 w-10 rounded-xl bg-secondary-grey' />
				</Box>

				<Box className='flex justify-around'>
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
				<span
					className='cursor-pointer text-sm text-primary-grey duration-300 hover:text-black'
					onClick={() => alert('show select')}
				>
					{'Active >'}
				</span>
			</Box>

			<List
				rows={rows}
				renderRow={(row) => (
					<Item
						icon={<div className='border-2 border-primary-violet bg-secondary-grey' />}
						name={row.name}
						description={textHelpers.getRatio(row.savedAmount, row.targetAmount, row.currencySymbol)}
						onClick={(navigate) => navigate(APP_PATH.goalDetails)}
					/>
				)}
			/>
		</Box>
	);
}
