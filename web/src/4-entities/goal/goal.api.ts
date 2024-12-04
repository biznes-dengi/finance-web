import {isAxiosError} from 'axios';

import {getApiPath, HttpClient} from '@shared/api';
import {
	ApiFetchItemsParams,
	ApiFundGoalParams,
	boardSavingBalanceValidator,
	boardSavingIdValidator,
	CreateApiParams,
	DeleteApiParams,
	detailsValidator,
	EditApiParams,
	goalTransactionValidator,
	savingPagedValidator,
	TransferApiParams,
} from './goal.types.ts';

async function fetchBoardSavingsId(accountId: number) {
	try {
		const response = await HttpClient.get({url: getApiPath('board-goals/id'), data: {accountId}});
		return boardSavingIdValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchBoardSavingsBalance(boardSavingId?: number) {
	if (!boardSavingId) return undefined;

	try {
		const response = await HttpClient.get({url: getApiPath('board-goals/balance'), data: {boardGoalId: boardSavingId}});
		return boardSavingBalanceValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchItems({filter, boardGoalId}: ApiFetchItemsParams) {
	if (!boardGoalId) {
		return undefined;
	}

	try {
		const response = await HttpClient.get({
			url: getApiPath(`board-goals/${boardGoalId}/goals`),
			data: filter,
		});
		return savingPagedValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fundGoal({id, boardGoalId, payload}: ApiFundGoalParams) {
	if (!boardGoalId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-goals/${boardGoalId}/goals/${id}/transactions`),
		data: payload,
	});
}

async function withdrawGoal({id, boardGoalId, payload}: ApiFundGoalParams) {
	if (!boardGoalId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-goals/${boardGoalId}/goals/${id}/transactions`),
		data: payload,
	});
}

async function transferGoal({boardGoalId, payload}: TransferApiParams) {
	if (!boardGoalId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-goals/${boardGoalId}/transfer`),
		data: payload,
	});
}

async function createGoal({boardGoalId, payload}: CreateApiParams) {
	if (!boardGoalId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-goals/${boardGoalId}/goals`),
		data: payload,
	});
}

async function fetchDetails({boardGoalId, id}: {boardGoalId?: number; id: number}) {
	try {
		const response = await HttpClient.get({
			url: getApiPath(`board-goals/${boardGoalId}/goals/${id}`),
		});
		return detailsValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchGoalTransactions({filter, boardGoalId, id}: ApiFetchItemsParams & {id: number}) {
	if (!boardGoalId) {
		return undefined;
	}

	try {
		const response = await HttpClient.get({
			url: getApiPath(`board-goals/${boardGoalId}/goals/${id}/transactions`),
			data: filter,
		});
		return goalTransactionValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function editGoal({boardGoalId, goalId, payload}: EditApiParams) {
	if (!boardGoalId || !goalId) {
		return {};
	}

	await HttpClient.put({
		url: getApiPath(`board-goals/${boardGoalId}/goals/${goalId}`),
		data: payload,
	});
}

async function deleteGoal({boardGoalId, id}: DeleteApiParams) {
	if (!boardGoalId) {
		return {};
	}

	await HttpClient.delete({
		url: getApiPath(`board-goals/${boardGoalId}/goals/${id}`),
	});
}

export const goalApi = {
	fetchBoardSavingsId,
	fetchBoardSavingsBalance,
	fetchItems,
	fundGoal,
	withdrawGoal,
	transferGoal,
	createGoal,
	fetchDetails,
	fetchGoalTransactions,
	editGoal,
	deleteGoal,
};
