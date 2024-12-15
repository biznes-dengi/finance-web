import {STATUS_POPUP_TEXT} from '@shared/ui';

export type StatusTextKey = keyof typeof STATUS_POPUP_TEXT;

export type StatusPopupProps = {
	isOpen: boolean;
	status: 'success' | 'error' | 'congratulations';
	statusTextKey: StatusTextKey;
	statusTextProps?: any;
};
