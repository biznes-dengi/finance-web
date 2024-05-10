export const APP_TEXT = {
	signIn: 'Sign in',
	forgotPassword: 'Forgot your password?',
	dontHaveAccount: 'Don’t have an account yet?',
	pageNotFound: 'Page not found',
	goBackHome: 'Go back home',
	dontHaveAccess: 'Sorry, but you do not have access to this page',
	accumulation: 'Accumulation',
	goal: 'Goal',
	goalName: 'Goal name',
	goals: 'Goals',
	create: 'Create',
	fund: 'Fund',
	transfer: 'Transfer',
	more: 'More',
	continue: 'Continue',
	search: 'Search',
	amount: 'Amount',
	progress: 'Progress',
	transactions: 'Transactions',
	seeAll: 'See all',
	createdSuccess: 'has been successfully created',
	getBalance: (balance: number, currencySymbol: string) => `Balance: ${balance} ${currencySymbol}`,
} as const;
