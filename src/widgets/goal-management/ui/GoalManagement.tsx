import {Button, Card} from '@shared/ui';

import {List, ListItem, Management} from '@entities/ui';

import {buttonConfigs} from '../lib/button.config.ts';
import {getSubtitle} from '../lib/layout.helpers.ts';
import {Goal, goalModel} from '@entities/goal';
import {APP_TEXT} from '@shared/constants';

export function GoalManagement() {
	const {rows, goalItem} = goalModel.useData();

	return (
		<Card>
			<Management item={goalItem} buttonConfigs={buttonConfigs} subtitle={APP_TEXT.accumulated} />
			<List<Goal>
				rows={rows}
				renderRow={(row) => (
					<Button key={row.name} className='items-center' onClick={() => alert(`go to ${row.name} details`)}>
						<ListItem title={row.name} subtitle={getSubtitle(row)} />
					</Button>
				)}
			/>
		</Card>
	);
}
