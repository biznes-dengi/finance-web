import {SavingProgress} from '@widgets/saving';
import {Box, Button, Card, Item, List, PageHeader} from '@shared/ui';

import {APP_PATH, APP_TEXT} from '@shared/constants';

const transactions = [
	{name: 'Add money', description: 'Today, 15:45', amount: '+37 $'},
	{name: 'Withdraw', description: '03.02.2023, 17:15', amount: '-47 $'},
	{name: 'Ferrari', description: '01.02.2023, 11:18', amount: '+397 $'},
];

export function GoalDetailsPage() {
	return (
		<>
			<Box className='flex h-[290px] flex-col justify-between bg-secondary-grey'>
				<PageHeader title='Mustang' backPath={APP_PATH.root} />

				<Box className='mb-4 flex justify-between px-6'>
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
					<div className='h-12 w-12 rounded-full bg-primary-grey' />
				</Box>
			</Box>

			<Box mediumMarginY basePaddingX>
				<SavingProgress />

				<Card
					title={APP_TEXT.transactions}
					titleButton={<Button onClick={() => alert('seeAll')}>{APP_TEXT.seeAll}</Button>}
				>
					<List
						rows={transactions}
						renderRow={(row) => (
							<Item
								image={<div className='size-10 rounded-full bg-secondary-violet' />}
								name={row.name}
								description={row.description}
								onClick={() => {}}
							/>
						)}
					/>
				</Card>
			</Box>
		</>
	);
}
