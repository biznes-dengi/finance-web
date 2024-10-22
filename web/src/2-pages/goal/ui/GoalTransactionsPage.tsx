import {useParams} from 'react-router-dom';
import {Box, Card, Item, List, PageHeader} from '@shared/ui';
import {getTransactionName, getTransactionRightName} from '@pages/goal/lib/goal.lib.ts';
import {getGoalDetailsPath} from '@shared/constants/appPath.constant.ts';
import {APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {goalModel} from '@entities/goal';
import {textHelpers} from '@shared/lib';

export function GoalTransactionsPage() {
	const {goalId} = useParams();
	const {goalDetails: details} = goalModel.useDetails(goalId);
	const {items, isItemsLoading} = goalModel.useGoalTransactions(goalId);

	const total =
		items?.reduce((total, item) => {
			total += item.amount;
			return total;
		}, 0) || 0;

	return (
		<>
			<PageHeader title={APP_TEXT.transactions} backPath={getGoalDetailsPath(goalId)} />

			<Box baseSpaceWithoutTop>
				<Card
					title='10 march'
					rightTitle={
						<div className='text-sm font-light text-primary-grey'>
							{total !== 0 && total > 0 ? '+' : '-'}
							{textHelpers.getAmountWithCurrency(total, details ? CURRENCY_MAP[details.balance.currency].symbol : '')}
						</div>
					}
				>
					<List
						isFetching={isItemsLoading}
						rows={items}
						renderRow={(row) => (
							<Item
								image={<div className='size-10 rounded-full bg-secondary-violet' />}
								name={getTransactionName(row.type)}
								description={row.date}
								rightName={details && getTransactionRightName(row.type, row.amount, details.balance.currency)}
								onClick={() => alert('go to transaction details')}
							/>
						)}
					/>
				</Card>
			</Box>
		</>
	);
}
