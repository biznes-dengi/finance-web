import {CURRENCY} from '@shared/constants';
import {ReactNode} from 'react';

export type EditButtonFieldProps<Value> = {
	type: 'text' | 'date' | 'amount' | 'select';
	value: Value;
	onChange: (value: Value) => void;
	options?: {name: string; description: string; value: CURRENCY}[];
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	isChanged: boolean;
	fieldName: string;
	handleUpdate: () => void;
	children?: ReactNode;
};
