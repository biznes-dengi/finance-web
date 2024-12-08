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

export const CURRENCY_MAP = {
	[CURRENCY.USD]: {
		code: 'USD',
		symbol: '$',
	},
	[CURRENCY.PLN]: {
		code: 'USD',
		symbol: '$',
	},
	[CURRENCY.RUB]: {
		code: 'RUB',
		symbol: '₽',
	},
};
