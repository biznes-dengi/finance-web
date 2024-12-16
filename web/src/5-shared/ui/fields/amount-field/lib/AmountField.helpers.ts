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
		option: Option | null;
	}) {
		const {getCustomDescription, option} = props;

		if (getCustomDescription && option) {
			return getCustomDescription(option);
		}

		return option && isNumber(option.amount) && TextHelpers.getBalance(option.amount, option.currency);
	}

	static isItemSelected<Option extends AmountFieldOption>(option: Option, activeOption: Option | null) {
		if (option.id && activeOption?.id) {
			return option.id === activeOption.id;
		} else {
			return option.name === activeOption?.name;
		}
	}
}
