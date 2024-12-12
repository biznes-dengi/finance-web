import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Card, Icon, Item, List, PageHeader} from '@shared/ui';
import {APP_PATH} from '@shared/constants/appPath.constant.ts';
import {APP_TEXT, CURRENCY, CURRENCY_SYMBOL, TRANSACTION_TYPE} from '@shared/constants';
import {GoalModel} from '@entities/goal';
import {DateService, TextHelpers} from '@shared/lib';

const monthsMap = new Map([
	[0, 'Январь'],
	[1, 'Февраль'],
	[2, 'Март'],
	[3, 'Апрель'],
	[4, 'Май'],
	[5, 'Июнь'],
	[6, 'Июль'],
	[7, 'Август'],
	[8, 'Сентябрь'],
	[9, 'Октябрь'],
	[10, 'Ноябрь'],
	[11, 'Декабрь'],
]);
export function getTransactionName(row: any) {
	if (!row) return;

	const type = row.type as TRANSACTION_TYPE;

	if (type === TRANSACTION_TYPE.DEPOSIT) {
		return APP_TEXT.fund;
	}
	if (type === TRANSACTION_TYPE.WITHDRAW) {
		return APP_TEXT.withdraw;
	}
	if (type === TRANSACTION_TYPE.TRANSFER) {
		return `${row.fromGoalName} → ${row.toGoalName}`;
	}
}
export function getTransactionRightName(type: TRANSACTION_TYPE, amount: number, currency: CURRENCY) {
	if (type === TRANSACTION_TYPE.DEPOSIT) {
		return `+${TextHelpers.getAmount(amount)} ${CURRENCY_SYMBOL[currency]}`;
	}
	if (type === TRANSACTION_TYPE.WITHDRAW) {
		return `-${TextHelpers.getAmount(amount)} ${CURRENCY_SYMBOL[currency]}`;
	}
	if (type === TRANSACTION_TYPE.TRANSFER) {
		return `+${TextHelpers.getAmount(amount)} ${CURRENCY_SYMBOL[currency]}`;
	}
}
function groupItemsByMonth(items: any) {
	const result = {};

	items.forEach((item: any) => {
		const monthKey = getMonthKey(item.date);

		// @ts-ignore
		if (!result[monthKey]) {
			// @ts-ignore
			result[monthKey] = [];
		}

		// @ts-ignore
		result[monthKey].push(item);
	});

	return result;
}
function getMonthKey(itemDate: string) {
	const date = new Date(itemDate);
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}
function getTotal(items: any) {
	return (
		items?.reduce((total: any, item: any) => {
			total += (item.amount ?? item.toGoalAmount) as number;
			return total;
		}, 0) || 0
	);
}
export function getTransactionIcon(row: any) {
	if (!row) return;

	const type = row.type as TRANSACTION_TYPE;

	if (type === TRANSACTION_TYPE.DEPOSIT) {
		return <Icon type='depositTransaction' />;
	}
	if (type === TRANSACTION_TYPE.WITHDRAW) {
		return <Icon type='withdrawTransaction' />;
	}
	if (type === TRANSACTION_TYPE.TRANSFER) {
		return <Icon type='transferTransaction' />;
	}
}

export function GoalTransactionsPage() {
	const {id} = useParams();
	const {goalDetails} = GoalModel.useItemDetails({id});
	const {goalTransactions, isGoalTransactionsLoading} = GoalModel.useItemTransactions({id, filter: {pageNumber: 0}});

	const [groupedItems, setGroupedItems] = useState({});

	useEffect(() => {
		if (!goalTransactions?.length) return;
		setGroupedItems(groupItemsByMonth(goalTransactions));
	}, [goalTransactions]);

	return (
		<>
			<PageHeader title={APP_TEXT.transactions} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<Box basePaddingX className='flex flex-col gap-6 pb-6'>
				{Object.entries(groupedItems).map(([month, items]) => {
					const total = getTotal(items);
					return (
						<Card
							key={month}
							title={monthsMap.get(new Date(month).getMonth())}
							rightTitle={
								<div className='text-sm text-primary-grey'>
									{total !== 0 && total > 0 ? '+' : '-'}
									{TextHelpers.getAmountWithCurrency(
										total,
										goalDetails ? CURRENCY_SYMBOL[goalDetails.balance.currency] : '',
									)}
								</div>
							}
						>
							<List
								isLoading={isGoalTransactionsLoading}
								rows={items as any[]}
								renderRow={(row: any) => (
									<Item
										image={
											<div className='flex size-10 items-center justify-center rounded-full bg-secondary-violet text-primary-violet'>
												{getTransactionIcon(row)}
											</div>
										}
										name={getTransactionName(row)}
										description={row.date && new DateService(new Date(row.date)).getLocalDateString()}
										rightName={
											goalDetails &&
											getTransactionRightName(
												row.type,
												(row.amount ?? row.fromGoalAmount) as number,
												goalDetails.balance.currency,
											)
										}
										// onClick={() => alert('go to transaction details')}
									/>
								)}
							/>
						</Card>
					);
				})}
			</Box>
		</>
	);
}
