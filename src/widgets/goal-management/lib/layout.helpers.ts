import {CURRENCY, Goal} from '@entities/goal';
import {textHelpers} from '@shared/lib';

export function getSubtitle(row: Goal) {
	return textHelpers.getAmountWithCurrency(
		textHelpers.getRatio(textHelpers.getAmount(row.savedAmount), textHelpers.getAmount(row.targetAmount)),
		CURRENCY.USD,
	);
}
