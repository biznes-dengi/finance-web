import {APP_TEXT, CURRENCY, CURRENCY_SYMBOL, TRANSACTION_TYPE} from '@shared/constants';
import {Icon} from '@shared/ui';
import {TextHelpers} from '@shared/lib';

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

	static getTransactionIcon(row: any) {
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
}
