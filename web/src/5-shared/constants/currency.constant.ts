export enum CURRENCY {
	USD = 'USD',
	PLN = 'PLN',
	RUB = 'RUB',
}

export const CURRENCY_SYMBOL = {
	[CURRENCY.USD]: '$',
	[CURRENCY.PLN]: 'zł',
	[CURRENCY.RUB]: '₽',
};

export const CURRENCY_CODE = {
	[CURRENCY.USD]: 'USD',
	[CURRENCY.PLN]: 'PLN',
	[CURRENCY.RUB]: 'RUB',
};
