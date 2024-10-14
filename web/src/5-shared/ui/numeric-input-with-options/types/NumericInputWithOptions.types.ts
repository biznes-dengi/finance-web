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
	getLabel: (option: Option) => ReactNode;
	value: number | undefined;
	onChange: (value: number | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	options: Option[];
};
