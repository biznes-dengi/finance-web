export const STATUS_POPUP_TEXT = {
	createAccountSuccess: () => (
		<>
			Your account has been <span className='text-primary-violet'>successfully</span> created
		</>
	),
	createGoalSuccess: ({goalName}: any) => `Вы создали цель "${goalName}"`,
	createGoalError: ({goalName}: any) => `Some errors occur during creating goal "${goalName}"`,
	updateGoalSuccess: () => 'Ваша цель была обновлена',
	updateGoalError: () => 'Your goal has not been updated',
	deleteGoalSuccess: () => 'Your goal has been deleted',
	deleteGoalError: () => 'Your goal has not been deleted',
	fundGoalSuccess: ({goalName, amount}: any) => `Вы пополнили цель "${goalName}" на ${amount}`,
	fundGoalError: ({goalName}: any) => `Some errors occur during funding ${goalName}`,
	withdrawGoalSuccess: ({goalName, amount}: any) => `Вы вывели с цели "${goalName}" ${amount} `,
	withdrawGoalError: ({goalName}: any) => `Some errors occur during withdrawing ${goalName}`,
} as const;
