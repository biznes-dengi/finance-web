import {useNavigate} from 'react-router-dom';

import {APP_ICON, Button, ButtonConfig, Card, List, ListItem, Management, Transfer, useDrawer} from '@shared/ui';

import {type Goal, goalModel} from '@entities/goal';
import {APP_PATH, APP_TEXT} from '@shared/config';
import {textHelpers} from '@shared/lib';

export function GoalManagement() {
	const navigate = useNavigate();

	const {rows, goalItem} = goalModel.useData();

	const {openDrawer, Drawer} = useDrawer();

	const buttonConfigs = [
		{
			name: APP_TEXT.create,
			icon: APP_ICON.createGoal,
			onClick: ({navigate}) => navigate(APP_PATH.createGoal),
		},
		{
			name: APP_TEXT.fund,
			icon: APP_ICON.fund,
		},
		{
			name: APP_TEXT.transfer,
			icon: APP_ICON.transfer,
			onClick: openDrawer,
		},
		{
			name: APP_TEXT.more,
			icon: APP_ICON.more,
			onClick: () => {},
		},
	] as ButtonConfig[];

	return (
		<>
			<Card>
				<Management item={goalItem} buttonConfigs={buttonConfigs} subtitle={APP_TEXT.accumulation} />
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

			<Drawer>
				<Transfer />
			</Drawer>
		</>
	);
}
