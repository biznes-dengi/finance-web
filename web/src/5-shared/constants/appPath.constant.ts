//TODO: convert APP_PATH keys from strings to functions, to be able to paste params into URL

export const APP_PATH = {
	root: '/',
	home: '/goal-list',
	pageNotFound: '/page-not-found',
	goalList: '/goal-list',
	goalFund: '/goal-fund',
	goalWithdraw: '/goal-withdraw',
	goalTransfer: '/goal-transfer',
	createGoal: '/goal-create',
	goalDetails: '/goal-details',
	login: '/log-in',
	signup: '/sign-up',

	goal: {
		getItemDetailsPath(id: any) {
			return `${APP_PATH.goalDetails}/${id}`;
		},
		getItemTransactionsPath(id: any) {
			return `${APP_PATH.goalDetails}/${id}/transactions`;
		},
		getItemDetailsFundPath(id: any) {
			return `${APP_PATH.goalDetails}/${id}/fund`;
		},
		getItemDetailsWithdrawPath(id: any) {
			return `${APP_PATH.goalDetails}/${id}/withdraw`;
		},
		getItemDetailsTransferPath(id: any) {
			return `${APP_PATH.goalDetails}/${id}/transfer`;
		},
		getItemEditPath(id: any) {
			return `${APP_PATH.goalDetails}/${id}/edit`;
		},
	},
};

export function getItemDetailsPath(id: any) {
	return `${APP_PATH.goalDetails}/${id}`;
}
