import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Card, Item, List, PageHeader} from '@shared/ui';
import {getTransactionName, getTransactionRightName} from '@pages/goal/lib/goal.lib.ts';
import {getGoalDetailsPath} from '@shared/constants/appPath.constant.ts';
import {APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {goalModel} from '@entities/goal';
import {DateService, textHelpers} from '@shared/lib';

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

export function GoalTransactionsPage() {
	const {goalId} = useParams();
	const {goalDetails: details} = goalModel.useDetails(goalId);
	const {items, isItemsLoading} = goalModel.useGoalTransactions(goalId);

	const [groupedItems, setGroupedItems] = useState({});

	useEffect(() => {
		if (!items?.length) return;
		setGroupedItems(groupItemsByMonth(items));
	}, [items]);

	return (
		<>
			<PageHeader title={APP_TEXT.transactions} backPath={getGoalDetailsPath(goalId)} />

			<Box basePaddingX className='flex flex-col gap-6 pb-6'>
				{Object.entries(groupedItems).map(([month, items]) => {
					const total = getTotal(items);
					return (
						<Card
							key={month}
							title={monthsMap.get(new Date(month).getMonth())}
							rightTitle={
								<div className='text-sm font-light text-primary-grey'>
									{total !== 0 && total > 0 ? '+' : '-'}
									{textHelpers.getAmountWithCurrency(
										total,
										details ? CURRENCY_MAP[details.balance.currency].symbol : '',
									)}
								</div>
							}
						>
							<List
								isFetching={isItemsLoading}
								rows={items as any[]}
								renderRow={(row: any) => (
									<Item
										image={<div className='size-10 rounded-full bg-secondary-violet' />}
										name={getTransactionName(row.type)}
										description={row.date && new DateService(new Date(row.date)).getLocalDateString()}
										rightName={
											details &&
											getTransactionRightName(
												row.type,
												(row.amount ?? row.fromGoalAmount) as number,
												details.balance.currency,
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

function groupItemsByMonth(items: any) {
	const result = {};

	items.forEach((item: any) => {
		const monthKey = getMonthKey(item.date);

		// @ts-ignore
		if (!result[monthKey]) {
			// @ts-ignore
			result[monthKey] = [];
		}

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
