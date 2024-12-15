import {isNumber, TextHelpers} from '@shared/lib';
import {AmountFieldOption} from '../types/AmountField.types.ts';
import {ReactNode} from 'react';

export class AmountFieldHelpers {
	static getValue(value: string, withMinus?: boolean, withPlus?: boolean) {
		if (!value) return '';

		const amountValue = TextHelpers.getAmount(value);

		if (withMinus) {
			return `- ${amountValue}`;
		}

		if (withPlus) {
			return `+ ${amountValue}`;
		}

		return amountValue;
	}

	static getPlaceholder(withMinus?: boolean, withPlus?: boolean) {
		if (withMinus) {
			return '- 0';
		}
		if (withPlus) {
			return '+ 0';
		}
		return '0';
	}

	static getDescription<Option extends AmountFieldOption>(props: {
		getCustomDescription?: (option: Option) => ReactNode;
		activeOption: Option | null;
	}) {
		const {getCustomDescription, activeOption} = props;

		if (getCustomDescription && activeOption) {
			return getCustomDescription(activeOption);
		}

		return (
			activeOption &&
			isNumber(activeOption.amount) &&
			TextHelpers.getBalance(activeOption.amount, activeOption.currency)
		);
	}

	static isItemSelected<Option extends AmountFieldOption>(option: Option, activeOption: Option | null) {
		if (option.id && activeOption?.id) {
			return option.id === activeOption.id;
		} else {
			return option.name === activeOption?.name;
		}
	}
}
