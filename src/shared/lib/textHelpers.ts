import {CURRENCY} from '@entities/goal';

type Amount = number | string;

export class textHelpers {
	static getDontHaveAny(item: string) {
		return `You do not have any ${item.toLowerCase()} yet`;
	}

	static getRatio(currentAmount: Amount, targetAmount: Amount) {
		return `${currentAmount} / ${targetAmount}`;
	}

	static getAmountWithCurrency(amount: Amount, currency: CURRENCY) {
		return `${amount} ${currency}`;
	}

	static getAmount(amount: Amount) {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}
}
