import {ReactNode} from 'react';
import {CURRENCY} from '@shared/constants';

export type AmountFieldBaseOption = {
	id?: number;
	image?: any;
	name: string;
	balance: {
		amount: number;
		currency: CURRENCY;
	};
};

export type AmountFieldProps<Option> = {
	value: string;
	onChange: (value: string) => void;
	activeOption?: Option;
	isLoading?: boolean;

	setActiveOption?: (option: Option) => void;
	options?: Option[];
	getLabel?: (option: Option) => ReactNode;
	errorText?: string | boolean;
	withPlus?: boolean;
	withMinus?: boolean;
	isAutoFocusDisabled?: boolean;
};
