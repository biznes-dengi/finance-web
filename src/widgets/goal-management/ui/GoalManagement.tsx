import {useNavigate} from 'react-router-dom';

import {Button, Card, List, ListItem, Management} from '@shared/ui';

import {buttonConfigs} from '../lib/button.config.ts';
import {type Goal, goalModel} from '@entities/goal';
import {APP_PATH, APP_TEXT} from '@shared/config';
import {textHelpers} from '@shared/lib';

export function GoalManagement() {
	const navigate = useNavigate();

	const {rows, goalItem} = goalModel.useData();

	return (
		<Card>
			<Management item={goalItem} buttonConfigs={buttonConfigs} subtitle={APP_TEXT.accumulated} />
			<List<Goal>
				rows={rows}
				renderRow={(row) => (
					<Button key={row.name} onClick={() => navigate(APP_PATH.goalDetails)}>
						<ListItem
							name={row.name}
							description={textHelpers.getRatio(
								textHelpers.getAmountWithCurrency(row.savedAmount, row.currencySymbol),
								textHelpers.getAmountWithCurrency(row.targetAmount, row.currencySymbol),
							)}
						/>
					</Button>
				)}
			/>
		</Card>
	);
}
