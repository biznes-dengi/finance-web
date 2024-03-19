import {HttpClient} from '@shared/api/httpClient.ts';
import {Goal} from './goal.types.ts';

function fetchList(): Goal[] {
	return HttpClient.get();
}

function fetchItem(): {amount: number; currency: 'USD'} {
	return {
		amount: 3000,
		currency: 'USD',
	};
}

export const goalApi = {
	fetchList,
	fetchItem,
};
