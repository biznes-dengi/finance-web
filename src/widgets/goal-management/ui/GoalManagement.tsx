import {APP_ICON, Button, Card} from '@shared/ui';

import {List, ListItem, Management} from '@entities/ui';

import {CURRENCY, Goal, goalModel} from '@entities/goal';
import {textHelpers} from '@shared/lib';

const buttonConfigs = [
	{name: 'Create', icon: APP_ICON.CREATE_GOAL},
	{name: 'Fund', icon: APP_ICON.FUND},
	{name: 'Transfer', icon: APP_ICON.MOVE},
	{name: 'More', icon: APP_ICON.MORE},
];

export function GoalManagement() {
	const {rows, goalItem} = goalModel.useData();

	return (
		<Card>
			<Management item={goalItem} buttonConfigs={buttonConfigs} />
			<List<Goal>
				rows={rows}
				renderRow={(row) => (
					<Button key={row.name} onClick={() => alert('click button')}>
						<ListItem
							title={row.name}
							subtitle={textHelpers.getAmountWithCurrency(
								textHelpers.getRatio(textHelpers.getAmount(row.savedAmount), textHelpers.getAmount(row.targetAmount)),
								CURRENCY.USD,
							)}
						/>
					</Button>
				)}
			/>
		</Card>
	);
}
