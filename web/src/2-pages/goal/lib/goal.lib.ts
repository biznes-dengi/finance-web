import {TRANSACTION_ENUM} from '@entities/goal';
import {CURRENCY, CURRENCY_MAP} from '@shared/constants';
import {textHelpers} from '@shared/lib';

export function getTransactionName(type: TRANSACTION_ENUM) {
	if (type === TRANSACTION_ENUM.DEPOSIT) {
		return 'Deposit';
	}
	if (type === TRANSACTION_ENUM.WITHDRAW) {
		return 'Withdraw';
	}
	if (type === TRANSACTION_ENUM.TRANSFER) {
		return 'Transfer';
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
