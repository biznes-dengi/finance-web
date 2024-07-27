import {Box, Button, ListItem, Management} from '@shared/ui';

import {buttonConfigs} from '../config/savingManagement.config.ts';
import {goalModel} from '@entities/goal';
import {APP_PATH, APP_TEXT} from '@shared/config';
import {textHelpers} from '@shared/lib';

export function SavingManagement() {
	const {rows, goalItem} = goalModel.useData();

	return (
		<Box isCard>
			<Management item={goalItem} buttonConfigs={buttonConfigs} subtitle={APP_TEXT.accumulation} />

			<Box cardTitle={<span className='cursor-pointer duration-300 hover:text-black'>{'Active >'}</span>}>
				{rows.map((row) => (
					<Button key={row.name} onClick={({navigate}) => navigate(APP_PATH.goalDetails)}>
						<ListItem
							mask={<div role='mask' className='border-2 border-primary-violet bg-secondary-grey' />}
							name={row.name}
							description={textHelpers.getRatio(row.savedAmount, row.targetAmount, row.currencySymbol)}
						/>
					</Button>
				))}
			</Box>
		</Box>
	);
}
