import {Button, Card} from '@shared/ui';

import {List, ListItem, Management} from '@entities/ui';

import {buttonConfigs} from '../lib/button.config.ts';
import {Goal, goalModel} from '@entities/goal';
import {APP_TEXT} from '@shared/constants';
import {textHelpers} from '@shared/lib';

export function GoalManagement() {
	const {rows, goalItem} = goalModel.useData();

	return (
		<Card>
			<Management item={goalItem} buttonConfigs={buttonConfigs} subtitle={APP_TEXT.accumulated} />
			<List<Goal>
				rows={rows}
				renderRow={(row) => (
					<Button key={row.name} className='items-center' onClick={() => alert(`go to ${row.name} details`)}>
						<ListItem
							name={row.name}
							description={textHelpers.getAmountWithCurrency(
								textHelpers.getRatio(row.savedAmount, row.targetAmount),
								row.currencySymbol,
							)}
						/>
					</Button>
				)}
			/>
		</Card>
	);
}
