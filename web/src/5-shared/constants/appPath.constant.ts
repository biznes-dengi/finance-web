//TODO: convert to functions, to be able to paste params into URL

export enum APP_PATH {
	root = '/',
	pageNotFound = '/page-not-found',
	goalList = '/goal-list',
	goalFund = '/goal-fund',
	goalWithdraw = '/goal-withdraw',
	goalTransfer = '/goal-transfer',
	createGoal = '/goal-create',
	goalDetails = '/goal-details',
	logIn = '/log-in',
	signUp = '/sign-up',
}

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
