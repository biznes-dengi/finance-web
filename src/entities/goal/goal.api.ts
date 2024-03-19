import {HttpClient} from '@shared/api/httpClient.ts';
import {Goal} from './goal.types.ts';

export enum CURRENCY {
	USD = '$',
}

function fetchList(): Goal[] {
	return HttpClient.get();
}

function fetchItem(): {amount: number; currency: CURRENCY} {
	return {
		amount: 3000,
		currency: CURRENCY.USD,
	};
}

export const goalApi = {
	fetchList,
	fetchItem,
};
