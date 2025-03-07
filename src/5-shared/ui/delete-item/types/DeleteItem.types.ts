import {ReactNode} from 'react';
import {StatusTextKey} from '@shared/ui';

export type DeleteItemProps = {
	confirmationTitle: string;
	confirmationText?: string;
	entityName?: string;
	isPending: boolean;
	isSuccess: boolean;
	isError: boolean;
	actionButtonText?: string;
	handleDelete: () => void;
	children: ReactNode;
	successStatusTextKey: StatusTextKey;
	errorStatusTextKey: StatusTextKey;
};
