export const APP_TEXT = {
	forgotPassword: 'Forgot your password?',
	dontHaveAccount: 'Don’t have an account yet?',
	pageNotFound: 'Page not found',
	goBackHome: 'Go back home',
	dontHaveAccess: 'Sorry, but you do not have access to this page',
	balance: 'Balance',
	totalBalance: 'Total balance',
	goal: 'Goal',
	kaif: 'Кайф',
	saved: 'Saved',
	goalName: 'Goal name',
	goals: 'Goals',
	deadline: 'Срок',
	currency: 'Currency',
	left: 'Осталось',
	congratulations: 'Поздравляем',
	create: 'Create',
	fund: 'Fund',
	transfer: 'Transfer',
	withdraw: 'Withdraw',
	continue: 'Continue',
	search: 'Search',
	amount: 'Amount',
	targetAmount: 'Target amount',
	target: 'Target',
	progress: 'Progress',
	transaction: 'Transaction',
	transactions: 'Transactions',
	seeAll: 'See all',
	createdSuccess: 'has been successfully created',
	edit: 'Edit',
	update: 'Update',
	name: 'Name',
	deleteGoal: 'Delete Goal',
	deleteGoalConfirmation: 'Are you sure you want to delete the goal?',
	email: 'Email',
	password: 'Password',
	welcome: 'Welcome',
	logIn: 'Log in',
	signUp: 'Sign up',
	finansy: 'Finansy',
	createAccount: 'Create account',
	cancel: 'Cancel',
	confirm: 'Confirm',
} as const;

export function getEmptyText(emptyStateEntity: string) {
	return `Your ${emptyStateEntity} will appear here`;
}
