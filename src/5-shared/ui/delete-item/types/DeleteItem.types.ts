import {ReactNode} from 'react';

export type DeleteItemProps = {
	title: string;
	confirmationText: string;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	handleDelete: () => void;
	children: ReactNode;
};
