import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {Card, Item, List, LoadingItem, LoadingWrapper} from '@shared/ui';
import {DateService, InfiniteScroll, TextHelpers, TransactionHelpers, type Transactions} from '@shared/lib';

export function GoalTransactionsHistory() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {goalTransactions, isGoalTransactionsLoading, fetchNextGoalTransactionsPage, hasNextGoalTransactionsPage} =
		GoalModel.useItemTransactions({id});

	const [groupedItems, setGroupedItems] = useState<{string: Transactions} | null>(null);
	const [uniqueYears, setUniqueYears] = useState<number[] | null>(null);

	useEffect(() => {
		if (!goalTransactions?.length) return;

		const transactionYears = goalTransactions.map((transaction: any) => new Date(transaction.date).getFullYear());
		const uniqueYears = [...new Set(transactionYears)];

		setUniqueYears(uniqueYears);
		setGroupedItems(TransactionHelpers.groupItemsByMonth(goalTransactions));
	}, [goalTransactions?.length]);

	const isLoading = isGoalDetailsLoading || isGoalTransactionsLoading;

	return (
		<LoadingWrapper
			isLoading={isLoading}
			className='my-0.5 mb-[18px] h-4 w-10'
			loadingChildren={<LoadingItem withRightName />}
		>
			<InfiniteScroll
				fetchNextPage={fetchNextGoalTransactionsPage}
				hasNextPage={hasNextGoalTransactionsPage}
				isNotInList
			>
				{groupedItems &&
					Object.entries(groupedItems).map(([month, monthTransactions], transactionGroupIndex) => {
						return (
							<Card
								key={month}
								title={TransactionHelpers.getTransactionGroupTitle(month, uniqueYears)}
								rightTitle={
									<div className='text-sm text-primary-grey'>
										{TransactionHelpers.getMonthTotal(monthTransactions) > 0}
										{goalDetails &&
											TextHelpers.getAmountWithCurrency(
												TransactionHelpers.getMonthTotal(monthTransactions),
												goalDetails.balance.currency,
											)}
									</div>
								}
							>
								<List
									isLoading={isLoading}
									items={monthTransactions as any[]}
									renderItem={(row: any, index) => (
										<Item
											image={TransactionHelpers.getTransactionIcon(
												row,
												Number(goalDetails?.balance.amount) >= Number(goalDetails?.targetAmount) &&
													transactionGroupIndex === 0 &&
													index === 0,
											)}
											name={TransactionHelpers.getTransactionName(row)}
											description={row.date && new DateService(new Date(row.date)).getLocalDateString()}
											/*написал 10 дек в финансы чат, row && itemDetails - должно быть только row*/
											rightName={
												goalDetails &&
												TransactionHelpers.getTransactionRightName(
													row.type,
													(row.amount ?? row.fromGoalAmount) as number,
													goalDetails.balance.currency,
												)
											}
										/>
									)}
								/>
							</Card>
						);
					})}
			</InfiniteScroll>
		</LoadingWrapper>
	);
}
