import {CURRENCY} from '@shared/constants';

export type Saving = {
	id: number;
	title: string;
	image: any;
	amount: number;
	targetAmount: number;
	currencySymbol: string;
};

export type TotalGoal = {
	amount: number;
	currency: CURRENCY;
	currencyCode: string;
	currencySymbol: string;
};
