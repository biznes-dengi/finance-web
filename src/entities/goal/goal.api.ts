import {type Goal, type TotalGoal} from './goal.types.ts';
import {HttpClient} from '@shared/api';
import {CURRENCY} from '@shared/constants';

function fetchList(): Goal[] {
	return HttpClient.get();
}

function fetchItem(): TotalGoal {
	return {
		amount: 3000,
		currency: CURRENCY.USD,
		currencyCode: 'USD',
		currencySymbol: '$',
	};
}

export const goalApi = {
	fetchList,
	fetchItem,
};
