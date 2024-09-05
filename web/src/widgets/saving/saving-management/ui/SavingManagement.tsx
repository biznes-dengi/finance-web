import {useState} from 'react';

import {Box, Button, Item, List, SelectInCard} from '@shared/ui';

import {buttonConfigs, savingStatusOptions} from '../config/savingManagement.config.ts';
import {savingModel} from '@entities/saving';
import {APP_PATH, APP_TEXT} from '@shared/config';
import {textHelpers} from '@shared/lib';

export function SavingManagement() {
	const [savingStatus, setSavingStatus] = useState<string | null>(null);

	const {data} = savingModel.useItems({state: savingStatus, userId: 1});

	return (
		<Box isCard>
			<Box basePadding className='pb-0'>
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
				<SelectInCard value={savingStatus} onChange={(value) => setSavingStatus(value)} options={savingStatusOptions} />
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
