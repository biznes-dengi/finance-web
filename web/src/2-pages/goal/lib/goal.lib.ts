import {TRANSACTION_ENUM} from '@entities/goal';
import {APP_TEXT, CURRENCY, CURRENCY_MAP} from '@shared/constants';
import {textHelpers} from '@shared/lib';

export function getTransactionName(row: any) {
	const type = row.type as TRANSACTION_ENUM;

	if (type === TRANSACTION_ENUM.DEPOSIT) {
		return APP_TEXT.fund;
	}
	if (type === TRANSACTION_ENUM.WITHDRAW) {
		return APP_TEXT.withdraw;
	}
	if (type === TRANSACTION_ENUM.TRANSFER) {
		return `${row.fromGoalName} → ${row.toGoalName}`;
	}
}

export function getTransactionRightName(type: TRANSACTION_ENUM, amount: number, currency: CURRENCY) {
	if (type === TRANSACTION_ENUM.DEPOSIT) {
		return `+${textHelpers.getAmount(amount)} ${CURRENCY_MAP[currency].symbol}`;
	}
	if (type === TRANSACTION_ENUM.WITHDRAW) {
		return `-${textHelpers.getAmount(amount)} ${CURRENCY_MAP[currency].symbol}`;
	}
	if (type === TRANSACTION_ENUM.TRANSFER) {
		return `+${textHelpers.getAmount(amount)} ${CURRENCY_MAP[currency].symbol}`;
	}
}
