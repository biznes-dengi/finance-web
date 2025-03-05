import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Icon, type ButtonConfig} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.create + ' ' + APP_TEXT.goal.toLowerCase(),
		type: 'circle',
		icon: <Icon type='createGoal' />,
		onClick: ({navigate}) => navigate(APP_PATH.goal.create),
	},
	{
		name: APP_TEXT.fund,
		type: 'circle',
		icon: <Icon type='fund' />,
		onClick: ({navigate}) => navigate(APP_PATH.goal.fund),
	},
	{
		name: APP_TEXT.withdraw,
		type: 'circle',
		icon: <Icon type='withdraw' />,
		onClick: ({navigate}) => navigate(APP_PATH.goal.withdraw),
	},
	{
		name: APP_TEXT.transfer,
		type: 'circle',
		icon: <Icon type='transfer' />,
		onClick: ({navigate}) => navigate(APP_PATH.goal.transfer),
	},
] as ButtonConfig[];

export const goalStatusOptions = [
	{name: APP_TEXT.all, value: undefined},
	{name: APP_TEXT.active, value: 'ACTIVE'},
	{name: APP_TEXT.achieved, value: 'ACHIEVED'},
	{name: APP_TEXT.overdue, value: 'OVERDUE'},
] as const;
