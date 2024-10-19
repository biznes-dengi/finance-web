import {ReactNode} from 'react';
import {CURRENCY} from '@shared/constants';

export type TBaseOption = {
	id?: number;
	image?: any;
	name: string;
	balance: {
		amount: number;
		currency: CURRENCY;
	};
};

export type TNumericInputWithOptionsProps<Option> = {
	value: number | undefined;
	onChange: (value: number | undefined) => void;
	activeOption?: Option;
	setActiveOption?: (option: Option) => void;
	options?: Option[];
	getLabel?: (option: Option) => ReactNode;
	errorText?: string | boolean;
	withPlus?: boolean;
	withMinus?: boolean;
};
