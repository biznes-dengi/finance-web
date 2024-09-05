import {type Filter, getApiPath, getQueryParams, HttpClient} from '@shared/api';
import {type Saving} from './saving.types.ts';

class SavingApi {
	fetchItems(filter?: Filter): Promise<Saving[]> {
		let url = getApiPath('saving');

		if (filter) {
			url += getQueryParams(filter);
		}

		return HttpClient.get<Saving[]>({url});
	}
}

export const savingApi = new SavingApi();

// function fetchItem(): TotalGoal {
// 	return {
// 		amount: 3000,
// 		currency: CURRENCY.USD,
// 		currencyCode: 'USD',
// 		currencySymbol: '$',
// 	};
// }
