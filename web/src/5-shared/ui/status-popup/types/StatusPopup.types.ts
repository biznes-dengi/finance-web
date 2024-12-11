import {STATUS_POPUP_TEXT} from '@shared/ui';

export type StatusDialogProps = {
	isOpen: boolean;
	status: 'success' | 'error' | 'congratulations';
	statusTextKey: keyof typeof STATUS_POPUP_TEXT;
};
