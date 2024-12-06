import {
	APP_TEXT,
	getGoalDetailsEditPath,
	getGoalDetailsFundPath,
	getGoalDetailsTransferPath,
	getGoalDetailsWithdrawPath,
} from '@shared/constants';
import {ButtonConfig, Icon} from '@shared/ui';

export function getButtonConfigs(goalId?: string) {
	return [
		{
			name: APP_TEXT.edit,
			icon: <Icon type='edit' />,
			onClick: ({navigate}) => navigate(getGoalDetailsEditPath(goalId)),
		},
		{
			name: APP_TEXT.fund,
			icon: <Icon type='fund' />,
			onClick: ({navigate}) => navigate(getGoalDetailsFundPath(goalId)),
		},
		{
			name: APP_TEXT.withdraw,
			icon: <Icon type='withdraw' />,
			onClick: ({navigate}) => navigate(getGoalDetailsWithdrawPath(goalId)),
		},
		{
			name: APP_TEXT.transfer,
			icon: <Icon type='transfer' />,
			onClick: ({navigate}) => navigate(getGoalDetailsTransferPath(goalId)),
		},
	] as ButtonConfig[];
}
