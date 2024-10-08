import {CURRENCY, CURRENCY_MAP} from '@shared/constants';

export class textHelpers {
	static getDontHaveAny(item: string) {
		return `You do not have any ${item.toLowerCase()} yet`;
	}

	static getRatio(currentAmount: number, targetAmount: number, currency?: CURRENCY) {
		const current = this.getAmount(currentAmount);
		const target = this.getAmount(targetAmount);

		if (currency) {
			const currencySymbol = CURRENCY_MAP[currency].symbol;
			return `${current} / ${target} ${currencySymbol}`;
		}

		return `${current} / ${target}`;
	}

	static getAmountWithCurrency(amount?: number, currencySymbol?: string) {
		if (!amount || !currencySymbol) return null;

		return `${this.getAmount(amount)} ${currencySymbol}`;
	}

	static getAmount(amount: number) {
		const [int] = amount.toString().split('.');

		return int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}
}
