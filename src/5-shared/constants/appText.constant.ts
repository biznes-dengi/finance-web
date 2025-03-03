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
	walletName: 'Wallet name',
	walletAddress: 'Wallet address',
	goals: 'Goals',
	deadline: 'Deadline',
	transactionDate: 'Transaction date',
	addDeadline: 'Add deadline',
	currency: 'Currency',
	left: 'Осталось',
	eshe: 'Еще',
	congratulations: 'Поздравляем',
	create: 'Create',
	setImage: 'Set image',
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
	delete: 'Delete',
	share: 'Share',
	update: 'Update',
	save: 'Save',
	name: 'Name',
	deleteGoal: 'Delete goal',
	deleteGoalConfirmation: 'Are you sure you want to delete the goal?',
	email: 'Email',
	password: 'Password',
	welcome: 'Welcome',
	logIn: 'Log in',
	logOut: 'Log out',
	signUp: 'Sign up',
	finansy: 'Finansy',
	createAccount: 'Create account',
	cancel: 'Cancel',
	confirm: 'Confirm',
	noDate: 'No date',
	customise: 'Customise',
	selectCurrency: 'Select a currency',
	enterTargetValue: 'Enter target value',
	enterWalletName: 'Enter wallet name',
	enterWalletAddress: 'Enter wallet address',
	exchangeRate: 'Exchange rate',
	all: 'All',
	active: 'Active',
	achieved: 'Achieved',
	overdue: 'Overdue',
	portfolio: 'Portfolio',
	period: 'Period',
	portfolioName: 'Portfolio name',
	portfolios: 'Portfolios',
	createPortfolio: 'Create portfolio',
	connectWallet: 'Connect wallet',
	connect: 'Connect',
	connectWalletDisclaimer:
		'Finansy requests only view permissions and does not have access to your wallet, to your private keys nor to the ability to move your assets',
	connectedWallets: 'Connected wallets',
	howItWorks: 'How it works',
	assets: 'Assets',
	walletDetails: 'Wallet details',
} as const;

export function getEmptyText(emptyStateEntity: string) {
	return `Your ${emptyStateEntity} will appear here`;
}
