import {Card, Item, List, LoadingItem, LoadingWrapper} from '@shared/ui';
import {DateService, TextHelpers, TransactionHelpers, type Transactions} from '@shared/lib';
import {GoalModel} from '@entities/goal';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

export function GoalTransactionsHistory() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {goalTransactions, isGoalTransactionsLoading} = GoalModel.useItemTransactions({id, filter: {pageNumber: 0}});

	const [groupedItems, setGroupedItems] = useState<{string: Transactions} | null>(null);
	const [uniqueYears, setUniqueYears] = useState<number[] | null>(null);

	useEffect(() => {
		if (!goalTransactions?.length) return;

		const transactionYears = goalTransactions.map((transaction: any) => new Date(transaction.date).getFullYear());
		const uniqueYears = [...new Set(transactionYears)];

		setUniqueYears(uniqueYears);
		setGroupedItems(TransactionHelpers.groupItemsByMonth(goalTransactions));
	}, [goalTransactions]);

	const isLoading = isGoalDetailsLoading || isGoalTransactionsLoading;

	return (
		<div className='flex flex-col gap-6 px-4 pb-6'>
			<LoadingWrapper
				isLoading={isLoading}
				className='my-0.5 h-4 w-10'
				loadingChildren={<LoadingItem withRightName />}
			>
				{groupedItems &&
					Object.entries(groupedItems).map(([month, monthTransactions], transactionGroupIndex) => {
						// console.log(month);
						// console.log(JSON.stringify(monthTransactions));
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
									rows={monthTransactions as any[]}
									renderRow={(row: any, index) => (
										<Item
											image={TransactionHelpers.getTransactionIcon(
												row,
												Number(goalDetails?.balance.amount) >=
													Number(goalDetails?.targetAmount) &&
													transactionGroupIndex === 0 &&
													index === 0,
											)}
											name={TransactionHelpers.getTransactionName(row)}
											description={
												row.date && new DateService(new Date(row.date)).getLocalDateString()
											}
											// TODO: написал 10 дек в финансы чат, row && itemDetails - должно быть только row
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
			</LoadingWrapper>
		</div>
	);
}
