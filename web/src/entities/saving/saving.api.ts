import {type Filter, getApiPath, HttpClient} from '@shared/api';
import {type Saving} from './saving.types.ts';

class SavingApi {
	fetchItems(filter?: Filter): Promise<Saving[]> {
		return HttpClient.get<Saving[]>({url: getApiPath('saving'), filter});
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
