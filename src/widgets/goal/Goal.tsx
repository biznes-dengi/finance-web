import {APP_ICON, Button, BUTTON_TYPE, Card} from '@shared/ui';

import {goalModel} from '@entities/goal';
import {cn} from '@shared/lib';

export function Goal() {
	const {rows, goalItem} = goalModel.useData();

	const buttonConfigs = [
		{name: 'Create', icon: APP_ICON.CREATE_GOAL},
		{name: 'Fund', icon: APP_ICON.FUND},
		{name: 'Transfer', icon: APP_ICON.MOVE},
		{name: 'More', icon: APP_ICON.MORE},
	];

	return (
		<Card>
			<div role='widget-header' className='p-4'>
				<div className={cn('mb-4 flex justify-between')}>
					<div>
						<h1 className='text-2xl font-semibold'>
							{goalItem.amount} {goalItem.currency}
						</h1>
						<p className='font-light text-primary-grey'>Savings</p>
					</div>
					<div className='h-10 w-10 rounded-xl bg-amber-200' />
				</div>

				<div className='flex justify-between'>
					{buttonConfigs.map((buttonConfig) => (
						<Button key={buttonConfig.name} type={BUTTON_TYPE.circle} icon={buttonConfig.icon}>
							{buttonConfig.name}
						</Button>
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
