import {APP_PATH, APP_TEXT} from '@shared/config';
import {Icon, type ButtonConfig, ButtonType} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.create,
		type: ButtonType.icon,
		icon: Icon.createGoal,
		onClick: ({navigate}) => navigate(APP_PATH.createGoal),
	},
	{
		name: APP_TEXT.fund,
		type: ButtonType.icon,
		icon: Icon.fund,
	},
	{
		name: APP_TEXT.transfer,
		type: ButtonType.icon,
		icon: Icon.transfer,
		onClick: ({navigate}) => navigate(APP_PATH.goalTransfer),
	},
	{
		name: APP_TEXT.more,
		type: ButtonType.icon,
		icon: Icon.more,
		onClick: () => {},
	},
] as ButtonConfig[];

export const savingStatusOptions = [
	{name: 'All', value: null},
	{name: 'Active', value: 'ACTIVE'},
	{name: 'Achieved', value: 'ACHIEVED'},
	{name: 'Overdue', value: 'OVERDUE'},
];
