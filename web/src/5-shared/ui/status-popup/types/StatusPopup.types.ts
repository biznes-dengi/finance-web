import {STATUS_DIALOG_TEXT} from '@shared/ui';

export type StatusDialogProps = {
	isOpen: boolean;
	status: 'success' | 'error';
	statusTextKey: keyof typeof STATUS_DIALOG_TEXT;
};
