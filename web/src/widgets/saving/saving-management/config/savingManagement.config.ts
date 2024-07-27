import {APP_PATH, APP_TEXT} from '@shared/config';
import {APP_ICON, type ButtonConfig} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.create,
		icon: APP_ICON.createGoal,
		onClick: ({navigate}) => navigate(APP_PATH.createGoal),
	},
	{
		name: APP_TEXT.fund,
		icon: APP_ICON.fund,
	},
	{
		name: APP_TEXT.transfer,
		icon: APP_ICON.transfer,
		onClick: ({navigate}) => navigate(APP_PATH.goalTransfer),
	},
	{
		name: APP_TEXT.more,
		icon: APP_ICON.more,
		onClick: () => {},
	},
] as ButtonConfig[];
