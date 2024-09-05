import {type Filter, getApiPath, getQueryParams, HttpClient} from '@shared/api';
import {type Saving} from './saving.types.ts';

class SavingApi {
	private itemsURL = 'saving';

	fetchItems(filter?: Filter): Promise<Saving[]> {
		return HttpClient.get<Saving[]>({
			url: filter ? getApiPath(this.itemsURL) + getQueryParams(filter) : getApiPath(this.itemsURL),
		});
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
