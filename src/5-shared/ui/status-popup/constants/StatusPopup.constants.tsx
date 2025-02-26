export const STATUS_POPUP_TEXT = {
	createAccountSuccess: () => (
		<>
			Your account has been <span className='text-primary-violet'>successfully</span> created
		</>
	),

	createGoalSuccess: ({name}: any = {}) => `Вы создали цель "${name}"`,
	createGoalError: ({name}: any = {}) => `Some errors occur during creating goal "${name}"`,

	updateGoalSuccess: () => 'Ваша цель была обновлена',
	updateGoalError: () => 'Your goal has not been updated',

	deleteGoalSuccess: () => 'Your goal has been deleted',
	deleteGoalError: () => 'Your goal has not been deleted',

	fundGoalSuccess: ({name, amount}: any = {}) => `Вы пополнили цель "${name}" на ${amount}`,
	fundGoalError: ({name}: any = {}) => `Some errors occur during funding ${name}`,

	withdrawGoalSuccess: ({name, amount}: any = {}) => `Вы вывели с цели "${name}" ${amount} `,
	withdrawGoalError: ({name}: any = {}) => `Some errors occur during withdrawing ${name}`,

	transferGoalSuccess: () => 'Your transfer has been completed',
	transferGoalError: () => 'Some errors occur during transferring',

	connectWalletSuccess: ({name}: any) => `Wallet "${name}" connected`,
	connectWalletError: () => 'Some errors occur wallet connecting',

	createPortfolioSuccess: ({name}: any) => `Portfolio "${name}" created`,
	createPortfolioError: () => 'Some errors occur portfolio creating',
} as const;
