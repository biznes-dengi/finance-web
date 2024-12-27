export enum CURRENCY {
	USD = 'USD',
	EUR = 'EUR',
	BYN = 'BYN',
	RUB = 'RUB',
}

export const CURRENCY_SYMBOL = {
	[CURRENCY.USD]: '$',
	[CURRENCY.EUR]: '€',
	[CURRENCY.BYN]: 'Br',
	[CURRENCY.RUB]: '₽',
};

export const CURRENCY_CODE = {
	[CURRENCY.USD]: 'USD',
	[CURRENCY.EUR]: 'EUR',
	[CURRENCY.BYN]: 'BYN',
	[CURRENCY.RUB]: 'RUB',
};

export const CURRENCY_OPTIONS = [
	{description: 'USD', name: 'US Dollar', value: CURRENCY.USD},
	{description: 'EUR', name: 'Euro', value: CURRENCY.EUR},
	{description: 'RUB', name: 'Russian ruble', value: CURRENCY.RUB},
	{description: 'BYN', name: 'Belarusian ruble', value: CURRENCY.BYN},
];
