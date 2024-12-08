import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Icon, type ButtonConfig, ButtonType} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.create,
		type: ButtonType.icon,
		icon: <Icon type='createGoal' />,
		onClick: ({navigate}) => navigate(APP_PATH.createGoal),
	},
	{
		name: APP_TEXT.fund,
		type: ButtonType.icon,
		icon: <Icon type='fund' />,
		onClick: ({navigate}) => navigate(APP_PATH.goalFund),
	},
	{
		name: APP_TEXT.withdraw,
		type: ButtonType.icon,
		icon: <Icon type='withdraw' />,
		onClick: ({navigate}) => navigate(APP_PATH.goalWithdraw),
	},
	{
		name: APP_TEXT.transfer,
		type: ButtonType.icon,
		icon: <Icon type='transfer' />,
		onClick: ({navigate}) => navigate(APP_PATH.goalTransfer),
	},
] as ButtonConfig[];

export const goalStatusOptions = [
	{name: 'All', value: undefined},
	{name: 'Active', value: 'ACTIVE'},
	{name: 'Achieved', value: 'ACHIEVED'},
	{name: 'Overdue', value: 'OVERDUE'},
] as const;

export type GoalStatusValue = (typeof goalStatusOptions)[number]['value'];

export const defaultFilter = {
	pageNumber: 0,
	status: undefined as GoalStatusValue,
};
