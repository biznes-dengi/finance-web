import {APP_TEXT, CURRENCY, CURRENCY_SYMBOL, TRANSACTION_TYPE} from '@shared/constants';
import {Icon} from '@shared/ui';
import {cn, TextHelpers} from '@shared/lib';

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

	static groupItemsByMonth(items: any) {
		const result = {};

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

	static getTransactionTitle(monthData: any) {
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

		const [yearMonth, transactions] = monthData; // Получаем год-месяц и список транзакций
		const month = new Date(yearMonth).getMonth(); // Извлекаем месяц из "YYYY-MM"

		// Массив уникальных годов для транзакций
		const years = transactions.map((tx: any) => new Date(tx.date).getFullYear());
		const uniqueYears = [...new Set(years)]; // Уникальные годы

		// Если все транзакции из одного года
		if (uniqueYears.length === 1) {
			const year = uniqueYears[0];
			if (year === 2025) {
				return monthsMap.get(month); // Для 2025 года возвращаем только месяц без года
			} else {
				return `${monthsMap.get(month)} ${year}`; // Для 2024 года выводим месяц с годом
			}
		}

		// Если транзакции из разных лет
		const lastTransactionYear = Math.max(...(uniqueYears as number[])); // Находим последний год среди транзакций

		// Если год последней транзакции это 2025
		if (lastTransactionYear === 2025) {
			return monthsMap.get(month); // Для месяцев 2025 года показываем только месяц
		}

		// Для месяцев 2024 года показываем месяц с годом
		return `${monthsMap.get(month)} ${uniqueYears[0]}`;
	}
}
