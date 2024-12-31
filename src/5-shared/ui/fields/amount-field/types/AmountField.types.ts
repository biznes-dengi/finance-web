import {ReactNode} from 'react';
import {CURRENCY} from '@shared/constants';

export type AmountFieldOption = {
	id?: number | string;
	name: string;
	amount?: number;
	currency: CURRENCY;
	image?: any;
};

export type AmountFieldProps<Option> = {
	value: string;
	onChange: (value: string) => void;
	activeOption: Option | null;
	isLoading?: boolean;
	getCustomDescription?: (option: Option) => ReactNode;
	options?: Option[];
	fetchNextOptions?: () => void;
	hasNextOptions?: boolean;
	setActiveOption?: (option: Option) => void;
	errorText?: string | boolean;
	withPlus?: boolean;
	withMinus?: boolean;
	isAutoFocusDisabled?: boolean;
};
