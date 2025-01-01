import {ItemData} from '../types/MoneyActionPage.types.ts';

export class MoneyActionPageHelpers {
	static mapItemDataToOption(itemData: ItemData) {
		return {
			id: itemData.id,
			name: itemData.name,
			amount: itemData.balance.amount,
			currency: itemData.balance.currency,
		};
	}
}
