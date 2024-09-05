import {type Filter, getApiPath, getQueryParams, HttpClient} from '@shared/api';
import {type Saving} from './saving.types.ts';

class SavingApi {
	private itemsURL = 'saving';

	async fetchItems(filter?: Filter): Promise<Saving[]> {
		const url = filter ? getApiPath(this.itemsURL) + getQueryParams(filter) : getApiPath(this.itemsURL);

		return await HttpClient.get<Saving[]>({url});
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
