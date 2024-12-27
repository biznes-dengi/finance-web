import {goalStatusOptions} from '@widgets/goal/goal-management/config/GoalManagement.config.tsx';

export const goalsDefaultFilter = {
	pageNumber: 0,
	status: undefined as (typeof goalStatusOptions)[number]['value'],
};

export const goalNameMaxLength = 30;
