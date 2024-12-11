import {APP_TEXT, CURRENCY, CURRENCY_MAP} from '@shared/constants';
import {isNumber} from '@shared/lib';

export class TextHelpers {
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

	static getAmountWithCurrency(amount: number, currencySymbol: string) {
		if (!isNumber(amount) || !currencySymbol) return null;

		return `${this.getAmount(amount)} ${currencySymbol}`;
	}

	static getAmount(amount: number) {
		const [int, float] = amount.toString().split('.');

		let roundedFloat;

		if (float) {
			const strNumbers = float.split(''); // ['1', '2']
			const mappedFloat = strNumbers.reduce((acc, item, index) => {
				if (index === 0 || index === 1) {
					return acc + item;
				}

				if (index === 2) {
					return acc + `.${item}`;
				}

				return acc + item;
			}, '');
			roundedFloat = Math.round(Number(mappedFloat));
		}

		const beforeComma = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		const afterComma = roundedFloat ? `,${roundedFloat}` : '';

		return beforeComma + afterComma;
	}

	static getBalance(balance: number, currencySymbol: string) {
		return `${APP_TEXT.balance}: ${this.getAmountWithCurrency(balance, currencySymbol)}`;
	}
}
