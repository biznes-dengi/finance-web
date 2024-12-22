import {APP_TEXT, CURRENCY, CURRENCY_SYMBOL} from '@shared/constants';

export class TextHelpers {
	static getAmount(amount: number | string) {
		if (!String(amount).includes('.')) {
			return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		}

		const [int, float] = amount.toString().split('.');

		// Если дробная часть есть, округляем и выводим
		const strNumbers = float.split('');
		const mappedFloat = strNumbers.reduce((acc, item, index) => {
			if (index === 0 || index === 1) {
				return acc + item;
			}

			if (index === 2) {
				return acc + `.${item}`;
			}

			return acc + item;
		}, '');

		// Округляем и проверяем дробную часть
		const intNum = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
		const floatNum = mappedFloat ? Math.round(Number(mappedFloat)).toString() : '';

		return intNum + '.' + floatNum;
	}

	static getAmountWithCurrency(amount: number | string, currency: CURRENCY) {
		return `${this.getAmount(amount)} ${CURRENCY_SYMBOL[currency]}`;
	}

	static getRatio(currentAmount: number, targetAmount: number, currency?: CURRENCY) {
		const current = this.getAmount(currentAmount);
		const target = this.getAmount(targetAmount);

		if (currency) {
			const currencySymbol = CURRENCY_SYMBOL[currency];
			return `${current} / ${target} ${currencySymbol}`;
		}

		return `${current} / ${target}`;
	}

	static getBalance(balance: number, currency: CURRENCY) {
		return `${APP_TEXT.balance}: ${this.getAmountWithCurrency(balance, currency)}`;
	}
}
