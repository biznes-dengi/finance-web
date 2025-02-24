export const APP_PATH = {
	root: '/',
	home: '/portfolio-list',
	pageNotFound: '/page-not-found',
	login: '/log-in',
	signup: '/sign-up',

	goal: {
		list: '/goal-list',
		fund: '/goal-fund',
		withdraw: '/goal-withdraw',
		transfer: '/goal-transfer',
		create: '/goal-create',
		details: '/goal-details',

		getItemDetailsPath: (id: any) => `${APP_PATH.goal.details}/${id}`,
		getItemTransactionsPath: (id: any) => `${APP_PATH.goal.details}/${id}/transactions`,
		getItemDetailsFundPath: (id: any) => `${APP_PATH.goal.details}/${id}/fund`,
		getItemDetailsWithdrawPath: (id: any) => `${APP_PATH.goal.details}/${id}/withdraw`,
		getItemDetailsTransferPath: (id: any) => `${APP_PATH.goal.details}/${id}/transfer`,
		getItemEditPath: (id: any) => `${APP_PATH.goal.details}/${id}/edit`,
	},

	portfolio: {
		list: '/portfolio-list',
		connectWallet: '/connect-wallet',
		connectedWallets: '/portfolio-connected-wallets',
		create: '/portfolio-create',
	},
};
