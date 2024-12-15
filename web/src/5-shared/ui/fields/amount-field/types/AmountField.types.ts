import {ReactNode} from 'react';
import {CURRENCY} from '@shared/constants';

export type AmountFieldBaseOption = {
	name: string;
	currency: CURRENCY;
	image?: any;
	amount?: number;
	id?: number | string;
};

export type AmountFieldProps<Option> = {
	value: string;
	onChange: (value: string) => void;
	activeOption: Option | null;
	isLoading?: boolean;
	getCustomDescription?: (option: Option) => ReactNode;
	options?: Option[];
	setActiveOption?: (option: Option) => void;
	errorText?: string | boolean;
	withPlus?: boolean;
	withMinus?: boolean;
	isAutoFocusDisabled?: boolean;
};
