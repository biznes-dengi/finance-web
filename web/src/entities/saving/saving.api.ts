import {type DefaultApiMethodProps, getApiPath, HttpClient} from '@shared/api';
import {savingValidator} from './saving.types.ts';
import {CURRENCY} from '@shared/constants';

class SavingApi {
	async fetchItems({filter}: DefaultApiMethodProps) {
		const response = await HttpClient.get({url: getApiPath('saving'), filter});

		try {
			return savingValidator
				.array()
				.parse(response)
				.map((saving) => ({...saving, currency: 'usd' as CURRENCY}));
		} catch (error) {
			console.error(error);
			return [];
		}
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
