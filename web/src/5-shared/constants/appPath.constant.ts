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
};

export function getGoalDetailsPath(id: any) {
	return `${APP_PATH.goalDetails}/${id}`;
}

export function getGoalTransactionsPath(id: any) {
	return `${APP_PATH.goalDetails}/${id}/transactions`;
}

export function getGoalDetailsFundPath(id: any) {
	return `${APP_PATH.goalDetails}/${id}/fund`;
}

export function getGoalDetailsWithdrawPath(id: any) {
	return `${APP_PATH.goalDetails}/${id}/withdraw`;
}

export function getGoalDetailsTransferPath(id: any) {
	return `${APP_PATH.goalDetails}/${id}/transfer`;
}

export function getGoalDetailsEditPath(id: any) {
	return `${APP_PATH.goalDetails}/${id}/edit`;
}
