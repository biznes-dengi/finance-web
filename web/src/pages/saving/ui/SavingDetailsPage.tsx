import {Box, Button, ListItem, PageHeader} from '@shared/ui';

import {APP_PATH, APP_TEXT} from '@shared/config';
import {SavingProgress} from '@widgets/saving';

const transactions = [
	{name: 'Add money', description: 'Today, 15:45', amount: '+37 $'},
	{name: 'Withdraw', description: '03.02.2023, 17:15', amount: '-47 $'},
	{name: 'Ferrari', description: '01.02.2023, 11:18', amount: '+397 $'},
];

export function SavingDetailsPage() {
	return (
		<>
			<div role='image-wrapper' className='flex h-[290px] flex-col justify-between bg-secondary-grey'>
				<PageHeader title='Mustang' backPath={APP_PATH.root} />

				<div className='mb-4 flex justify-between px-6'>
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
				</div>
			</div>

			<Box withMediumVertical withBaseHorizontal>
				<SavingProgress />

				<Box title={APP_TEXT.transactions} titleButton={APP_TEXT.seeAll} isCard>
					{transactions.map((row, index) => (
						<Button key={index} onClick={() => {}}>
							<ListItem name={row.name} description={row.description} amount={row.amount} />
						</Button>
					))}
				</Box>
			</Box>
		</>
	);
}
