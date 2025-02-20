import {ReactNode} from 'react';
import {AmountFieldOption} from '@shared/ui/fields/amount-field/types/AmountField.types.ts';
import {CURRENCY} from '@shared/constants';

export type EditButtonFieldProps<Value> = {
	type: 'text' | 'date' | 'amount' | 'select';
	icon?: 'edit' | 'add' | 'calendar';
	initialValue: Value;
	value: Value;
	onChange: (value: Value) => void;
	options?: {name: string; description: string; value: CURRENCY}[];
	activeOption?: AmountFieldOption | null;
	isChanged: boolean;
	isRequired?: boolean;
	title: string;
	children?: ReactNode;
	isPending?: boolean;
	isSuccess?: boolean;
	isError?: boolean;
	handleUpdate?: () => void;
	maxLength?: number;

	minDate?: Date;
	isNotEdit?: boolean;
};
