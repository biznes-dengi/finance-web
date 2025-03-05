import {ReactNode} from 'react';

export type TextEditButtonProps = {
	children: ReactNode;
	entityName: string;
	maxLength?: number;
	initialValue: string;
	value: string;
	onChange: (value: string) => void;
	handleUpdate: () => void;
	isLoading?: boolean;
	isChanged: boolean;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
};
