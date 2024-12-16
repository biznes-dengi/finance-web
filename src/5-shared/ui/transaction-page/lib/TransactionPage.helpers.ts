import {ItemData} from '../types/TransactionPage.types.ts';

export class TransactionPageHelpers {
	static mapItemDataToOption(itemData: ItemData) {
		return {
			id: itemData.id,
			name: itemData.name,
			amount: itemData.balance.amount,
			currency: itemData.balance.currency,
		};
	}
}
