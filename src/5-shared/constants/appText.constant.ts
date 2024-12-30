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
	deadline: 'Deadline',
	transactionDate: 'Transaction date',
	addDeadline: 'Add deadline',
	currency: 'Currency',
	left: 'Осталось',
	eshe: 'Еще',
	congratulations: 'Поздравляем',
	create: 'Create',
	fund: 'Fund',
	transfer: 'Transfer',
	withdraw: 'Withdraw',
	continue: 'Continue',
	search: 'Search',
	amount: 'Amount',
	targetAmount: 'Target amount',
	addTargetAmount: 'Add target amount',
	target: 'Target',
	goalAchieved: 'Goal achieved',
	progress: 'Progress',
	transaction: 'Transaction',
	transactions: 'Transactions',
	seeAll: 'See all',
	createdSuccess: 'has been successfully created',
	edit: 'Edit',
	update: 'Update',
	save: 'Save',
	name: 'Name',
	deleteGoal: 'Delete goal',
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
	noDate: 'No date',
	customise: 'Customise',
	selectCurrency: 'Select a currency',
	enterTargetAmount: 'Enter target amount',
	exchangeRate: 'Exchange rate',
	all: 'All',
	active: 'Active',
	achieved: 'Achieved',
	overdue: 'Overdue',
} as const;

export function getEmptyText(emptyStateEntity: string) {
	return `Your ${emptyStateEntity} will appear here`;
}
