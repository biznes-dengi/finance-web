import {Button, Card} from '@shared/ui';

import {goalModel} from '@entities/goal';
import {cn} from '@shared/helpers';

export function Goal() {
	const {rows} = goalModel.useData();

	const buttonConfigs = [{name: 'button-1'}, {name: 'button-2'}, {name: 'button-3'}, {name: 'button-4'}];

	return (
		<Card>
			<div role='widget-header' className='p-4'>
				<div className={cn('mb-4 flex justify-between')}>
					<div>money-amount</div>
					<div>goal-icon</div>
				</div>

				<div className='flex justify-between'>
					{buttonConfigs.map((buttonConfig) => (
						<div key={buttonConfig.name}>{buttonConfig.name}</div>
					))}
				</div>
			</div>

			<div className='px-4 py-3 font-medium text-primary-grey'>list-items</div>

			{rows.map((row) => (
				<Button key={row.name} onClick={() => alert('click button')}>
					{row.name}
				</Button>
			))}
		</Card>
	);
}
