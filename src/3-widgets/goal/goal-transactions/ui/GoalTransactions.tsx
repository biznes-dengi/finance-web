import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Card, Item, LinkTitleInCard, List} from '@shared/ui';
import {DateService, TransactionHelpers} from '@shared/lib';

export function GoalTransactions() {
	const {id} = useParams();

	const {goalTransactions, isGoalTransactionsLoading} = GoalModel.useItemTransactions({id, filter: {pageNumber: 0}});
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const isLoading = isGoalTransactionsLoading || isGoalDetailsLoading;

	return (
		<Card
			titleInCard={
				!isLoading && !goalTransactions?.length ? null : (
					<LinkTitleInCard title={APP_TEXT.transactions} path={APP_PATH.goal.getItemTransactionsPath(id)} />
				)
			}
			isLoading={isLoading}
		>
			<List
				emptyTextKey='transactions'
				isLoading={isLoading}
				rows={goalTransactions ? [goalTransactions[0], goalTransactions[1], goalTransactions[2]] : []}
				renderRow={(row, index) => {
					if (!row) return null;
					return (
						<Item
							image={
								<div className='flex size-10 items-center justify-center rounded-full bg-secondary-violet text-primary-violet'>
									{TransactionHelpers.getTransactionIcon(
										row,
										Number(goalDetails?.balance.amount) >= Number(goalDetails?.targetAmount) && index === 0,
									)}
								</div>
							}
							name={TransactionHelpers.getTransactionName(row)}
							description={new DateService(new Date(row.date as string)).getLocalDateString()}
							// TODO: написал 10 дек в финансы чат, row && itemDetails - должно быть только row
							rightName={
								row &&
								goalDetails &&
								TransactionHelpers.getTransactionRightName(
									row.type,
									(row.amount ?? row.toGoalAmount) as number,
									goalDetails.balance.currency,
								)
							}
						/>
					);
				}}
			/>
		</Card>
	);
}
