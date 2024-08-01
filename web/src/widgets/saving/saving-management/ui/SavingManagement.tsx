import {Box, Button, Item} from '@shared/ui';

import {buttonConfigs} from '../config/savingManagement.config.ts';
import {goalModel} from '@entities/goal';
import {APP_PATH, APP_TEXT} from '@shared/config';
import {cn, textHelpers} from '@shared/lib';

export function SavingManagement() {
	const {rows, goalItem} = goalModel.useData();

	return (
		<Box isCard>
			<div className='p-4'>
				<div className={cn('flex justify-between pb-4')}>
					<div>
						<div className='mb-1 text-3xl font-semibold'>
							{textHelpers.getAmountWithCurrency(goalItem.amount, goalItem.currencySymbol)}
						</div>
						<div className='text-sm font-light text-primary-grey'>{APP_TEXT.accumulation}</div>
					</div>
					<div className='h-10 w-10 rounded-xl bg-secondary-grey' />
				</div>

				<div className='flex justify-around'>
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
				</div>
			</div>

			<Box cardTitle={<span className='cursor-pointer duration-300 hover:text-black'>{'Active >'}</span>}>
				{rows.map((row) => (
					<Item
						key={row.name}
						icon={<div className='border-2 border-primary-violet bg-secondary-grey' />}
						name={row.name}
						description={textHelpers.getRatio(row.savedAmount, row.targetAmount, row.currencySymbol)}
						rightName={'28 372'}
						rightDescription={'+10%'}
						onClick={(navigate) => navigate(APP_PATH.goalDetails)}
					/>
				))}
			</Box>
		</Box>
	);
}
