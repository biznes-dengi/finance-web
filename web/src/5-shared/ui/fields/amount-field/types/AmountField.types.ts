import {ReactNode} from 'react';
import {CURRENCY} from '@shared/constants';

export type AmountFieldBaseOption = {
	name: string;
	currency: CURRENCY;
	image?: any;
	balance?: number;
	id?: number;
};

export type AmountFieldProps<Option> = {
	value: string;
	onChange: (value: string) => void;
	activeOption?: Option;
	isLoading?: boolean;
	getCustomDescription?: (option: Option) => ReactNode;

	setActiveOption?: (option: Option) => void;
	options?: Option[];
	errorText?: string | boolean;
	withPlus?: boolean;
	withMinus?: boolean;
	isAutoFocusDisabled?: boolean;
};
