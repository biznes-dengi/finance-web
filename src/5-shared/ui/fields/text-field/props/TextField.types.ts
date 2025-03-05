import {ReactNode} from 'react';

export type TextFieldProps = {
	type?: 'email' | 'text' | 'password';
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	enterKeyHint?: 'search' | 'enter' | 'done' | 'go' | 'next' | 'previous' | 'send';
	description?: ReactNode;
	maxLength?: number;
	isFocused?: boolean;
	setIsFocused?: (value: boolean) => void;
	isSearch?: boolean;
	errorText?: ReactNode;
};
