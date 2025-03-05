import {ReactNode} from 'react';
import {StatusTextKey} from '@shared/ui';

export type DeleteItemProps = {
	confirmationTitle: string;
	entityName: string;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	handleDelete: () => void;
	children: ReactNode;
	successStatusTextKey: StatusTextKey;
	errorStatusTextKey: StatusTextKey;
};
