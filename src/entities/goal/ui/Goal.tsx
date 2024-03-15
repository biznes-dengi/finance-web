import {Button, Card} from '@shared/ui';

import {cn} from '@shared/helpers';

// TODO:
//  1. split into diff widgets
//  2. Кнопки по конфигу или просто разметкой? -- По конфигу, т.к. они будут одинаково выглядеть на всех карточках
//  3. Конфиг с кнопками здесь? -- Да, потому что все привязано к goals
//  	у одной кнопки редирект на кучу страниц (process)
//  	у другой кнопки экшен (пополнить)
//  	у третьей изменить порядок элементов (включить drag n drop)

export function Goal() {
	const rowsDataFromApi = [{name: 'list-item-1'}, {name: 'list-item-2'}, {name: 'list-item-3'}];
	const buttonConfigs = [{name: 'button-1'}, {name: 'button-2'}, {name: 'button-3'}, {name: 'button-4'}];

	return (
		<>
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

				{rowsDataFromApi.map((row) => (
					<Button key={row.name} onClick={() => alert('click button')}>
						{row.name}
					</Button>
				))}
			</Card>
		</>
	);
}
