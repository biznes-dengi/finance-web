type Amount = number | string;

export class textHelpers {
	static getDontHaveAny(item: string) {
		return `You do not have any ${item.toLowerCase()} yet`;
	}

	static getRatio(currentAmount: Amount, targetAmount: Amount, currencySymbol?: string) {
		if (currencySymbol) {
			const current = this.getAmountWithCurrency(currentAmount, currencySymbol);
			const target = this.getAmountWithCurrency(targetAmount, currencySymbol);

			return `${current} / ${target}`;
		}

		return `${this.getAmount(currentAmount)} / ${this.getAmount(targetAmount)}`;
	}

	static getAmountWithCurrency(amount: Amount, currencySymbol: string) {
		return `${this.getAmount(amount)} ${currencySymbol}`;
	}

	static getAmount(amount: Amount) {
		const [int] = amount.toString().split('.');

		return int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}
}