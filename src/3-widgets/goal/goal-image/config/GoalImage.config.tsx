import {APP_PATH, APP_TEXT} from '@shared/constants';
import {ButtonConfig, ButtonType, Icon} from '@shared/ui';

export function getButtonConfigs(id?: string) {
	return [
		{
			name: APP_TEXT.edit,
			type: ButtonType.icon,
			icon: <Icon type='edit' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemEditPath(id)),
		},
		{
			name: APP_TEXT.fund,
			type: ButtonType.icon,
			icon: <Icon type='fund' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemDetailsFundPath(id)),
		},
		{
			name: APP_TEXT.withdraw,
			type: ButtonType.icon,
			icon: <Icon type='withdraw' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemDetailsWithdrawPath(id)),
		},
		{
			name: APP_TEXT.transfer,
			type: ButtonType.icon,
			icon: <Icon type='transfer' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemDetailsTransferPath(id)),
		},
	] as ButtonConfig[];
}
