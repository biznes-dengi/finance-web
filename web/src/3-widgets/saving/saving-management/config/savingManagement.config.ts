import {APP_PATH, APP_TEXT} from '@shared/constants';
import {type ButtonConfig, Icon} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.create,
		icon: Icon.createGoal,
		onClick: ({navigate}) => navigate(APP_PATH.createGoal),
	},
	{
		name: APP_TEXT.fund,
		icon: Icon.fund,
		onClick: ({navigate}) => navigate(APP_PATH.goalFund),
	},
	{
		name: APP_TEXT.withdraw,
		icon: Icon.withdraw,
		onClick: ({navigate}) => navigate(APP_PATH.goalWithdraw),
	},
	{
		name: APP_TEXT.transfer,
		icon: Icon.transfer,
		onClick: ({navigate}) => navigate(APP_PATH.goalTransfer),
	},
] as ButtonConfig[];

export const savingStateOptions = [
	{name: 'All', value: undefined},
	{name: 'Active', value: 'ACTIVE'},
	{name: 'Achieved', value: 'ACHIEVED'},
	{name: 'Overdue', value: 'OVERDUE'},
] as const;

export type TSavingStateValue = (typeof savingStateOptions)[number]['value'];
