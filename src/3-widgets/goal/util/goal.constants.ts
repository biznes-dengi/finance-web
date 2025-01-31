import {goalStatusOptions} from '@widgets/goal/goal-management/config/GoalManagement.config.tsx';

export const goalsDefaultFilter = {
	status: undefined as (typeof goalStatusOptions)[number]['value'],
};

export const goalNameMaxLength = 25;
