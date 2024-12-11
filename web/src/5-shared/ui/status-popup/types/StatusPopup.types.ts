import {STATUS_DIALOG_TEXT} from '@shared/ui';
import {ReactNode} from 'react';

export type StatusDialogProps = {
	isOpen: boolean;
	status: 'success' | 'error' | 'congratulations';
	statusTextKey: keyof typeof STATUS_DIALOG_TEXT;
	withDuration?: boolean;
	duration?: number;
	yesButtonText?: ReactNode;
};
