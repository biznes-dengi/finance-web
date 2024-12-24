import {APP_TEXT, CURRENCY, CURRENCY_SYMBOL, TRANSACTION_TYPE} from '@shared/constants';
import {Icon} from '@shared/ui';
import {cn, TextHelpers} from '@shared/lib';

export type Transactions = {id: number; type: TRANSACTION_TYPE; amount: number}[];

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

export class TransactionHelpers {
	static getTransactionName(row: any) {
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

	static getTransactionRightName(type: TRANSACTION_TYPE, amount: number, currency: CURRENCY) {
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

	static getTransactionIcon(row: any, isGoalCompleted?: boolean) {
		if (!row) return;

		const type = row.type as TRANSACTION_TYPE;

		let icon;

		if (type === TRANSACTION_TYPE.DEPOSIT) {
			icon = <Icon type='depositTransaction' />;
		}
		if (type === TRANSACTION_TYPE.WITHDRAW) {
			icon = <Icon type='withdrawTransaction' />;
		}
		if (type === TRANSACTION_TYPE.TRANSFER) {
			icon = <Icon type='transferTransaction' />;
		}

		return (
			<div
				className={cn(
					'flex size-10 items-center justify-center rounded-full bg-secondary-violet text-primary-violet',
					isGoalCompleted && 'bg-green-100 text-green-600',
				)}
			>
				{icon}
			</div>
		);
	}

	static groupItemsByMonth(items: any): {string: Transactions} {
		if (!items) return {} as {string: Transactions};

		const result = {} as {string: Transactions};

		function getMonthKey(itemDate: string) {
			const date = new Date(itemDate);
			return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
		}
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

	static getMonthTotal(items: any) {
		const total =
			items?.reduce((total: any, item: any) => {
				if (item.type === TRANSACTION_TYPE.DEPOSIT) {
					total += (item.amount ?? item.toGoalAmount) as number;
				}

				if (item.type === TRANSACTION_TYPE.WITHDRAW || item.type === TRANSACTION_TYPE.TRANSFER) {
					total -= (item.amount ?? item.toGoalAmount) as number;
				}

				return total;
			}, 0) || 0;

		return total > 0 ? `+${total}` : total;
	}

	static getTransactionGroupTitle(month: string, uniqueYears: number[] | null) {
		if (!uniqueYears) return;

		const monthIndex = new Date(month).getMonth();
		const monthYear = new Date(month).getFullYear();

		// Находим максимальный год среди транзакций
		const maxYear = Math.max(...uniqueYears);

		if (monthYear === maxYear) {
			return monthsMap.get(monthIndex);
		}

		return [monthsMap.get(monthIndex), monthYear].join(' ');
	}
}
