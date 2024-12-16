import {APP_PATH, APP_TEXT} from '@shared/constants';
import {ButtonConfig, Icon} from '@shared/ui';

export function getButtonConfigs(id?: string) {
	return [
		{
			name: APP_TEXT.edit,
			icon: <Icon type='edit' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemEditPath(id)),
		},
		{
			name: APP_TEXT.fund,
			icon: <Icon type='fund' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemDetailsFundPath(id)),
		},
		{
			name: APP_TEXT.withdraw,
			icon: <Icon type='withdraw' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemDetailsWithdrawPath(id)),
		},
		{
			name: APP_TEXT.transfer,
			icon: <Icon type='transfer' />,
			onClick: ({navigate}) => navigate(APP_PATH.goal.getItemDetailsTransferPath(id)),
		},
	] as ButtonConfig[];
}
