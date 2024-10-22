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
		const response = await HttpClient.get({url: getApiPath('board-savings/id'), data: {accountId}});
		return boardSavingIdValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchBoardSavingsBalance(boardSavingId: number) {
	try {
		const response = await HttpClient.get({url: getApiPath('board-savings/balance'), data: {boardSavingId}});
		return boardSavingBalanceValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchItems({filter, boardSavingId}: ApiFetchItemsParams) {
	if (!boardSavingId) {
		return undefined;
	}

	try {
		const response = await HttpClient.get({
			url: getApiPath(`board-savings/${boardSavingId}/savings`),
			data: filter,
		});
		return savingPagedValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fundGoal({id, boardSavingId, payload}: ApiFundGoalParams) {
	if (!boardSavingId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-savings/${boardSavingId}/savings/${id}/transactions`),
		data: payload,
	});
}

async function withdrawGoal({id, boardSavingId, payload}: ApiFundGoalParams) {
	if (!boardSavingId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-savings/${boardSavingId}/savings/${id}/transactions`),
		data: payload,
	});
}

async function transferGoal({boardSavingId, payload}: TransferApiParams) {
	if (!boardSavingId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-savings/${boardSavingId}/transfer`),
		data: payload,
	});
}

async function createGoal({boardSavingId, payload}: CreateApiParams) {
	if (!boardSavingId) {
		return {};
	}

	await HttpClient.post({
		url: getApiPath(`board-savings/${boardSavingId}/savings`),
		data: payload,
	});
}

async function fetchDetails({boardSavingId, id}: {boardSavingId?: number; id: number}) {
	try {
		const response = await HttpClient.get({
			url: getApiPath(`board-savings/${boardSavingId}/savings/${id}`),
		});
		return detailsValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchGoalTransactions({filter, boardSavingId, id}: ApiFetchItemsParams & {id: number}) {
	if (!boardSavingId) {
		return undefined;
	}

	try {
		const response = (await HttpClient.get({
			url: getApiPath(`board-savings/${boardSavingId}/savings/${id}/transactions`),
			data: filter,
		})) as any;

		const map = {
			hasNext: response.hasNext,
			items: response.transactions.map((item: any) => ({
				...item,
				date: '10 march',
			})),
		};

		return goalTransactionValidator.parse(map);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function editGoal({boardSavingId, payload}: EditApiParams) {
	if (!boardSavingId) {
		return {};
	}

	await HttpClient.put({
		url: getApiPath(`board-savings/${boardSavingId}/savings`),
		data: payload,
	});
}

async function deleteGoal({boardSavingId, id}: DeleteApiParams) {
	if (!boardSavingId) {
		return {};
	}

	await HttpClient.delete({
		url: getApiPath(`board-savings/${boardSavingId}/savings/${id}`),
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
