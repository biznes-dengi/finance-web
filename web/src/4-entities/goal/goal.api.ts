import {isAxiosError} from 'axios';

import {getApiPath, HttpClient} from '@shared/api';
import {
	ApiFetchItemsParams,
	ApiFundGoalParams,
	boardSavingBalanceValidator,
	boardSavingIdValidator,
	CreateApiParams,
	detailsScheme,
	goalTransactionScheme,
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
		// TODO mock
		const response = (await HttpClient.get({
			url: getApiPath(`board-savings/${boardSavingId}/savings`),
			data: filter,
		})) as any;

		// TODO mock
		const mappedResponse = {
			...response,
			data: response.data.map((item: any) => ({...item, balance: item.balanceResponse})),
		};

		return savingPagedValidator.parse(mappedResponse);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fundGoal({id, boardSavingId, payload}: ApiFundGoalParams) {
	if (!boardSavingId) {
		return {};
	}

	// TODO: mock
	const mappedPayload = {
		amount: payload.amount,
		type: payload.type,
		dealDate: payload.date,
	};

	await HttpClient.post({
		url: getApiPath(`board-savings/${boardSavingId}/savings/${id}/transactions`),
		data: mappedPayload,
	});
}

async function withdrawGoal({id, boardSavingId, payload}: ApiFundGoalParams) {
	if (!boardSavingId) {
		return {};
	}

	// TODO: mock
	const mappedPayload = {
		amount: payload.amount,
		type: payload.type,
		dealDate: payload.date,
	};

	await HttpClient.post({
		url: getApiPath(`board-savings/${boardSavingId}/savings/${id}/transactions`),
		data: mappedPayload,
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
		const response = (await HttpClient.get({
			url: getApiPath(`board-savings/${boardSavingId}/savings/${id}`),
		})) as any;

		const mapped = {
			id: response.id,
			name: response.name,
			state: response.state,
			balance: response.balanceResponse,
			targetAmount: response.targetAmount,
			deadline: response.mapped,
		};

		return detailsScheme.parse(mapped);
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
			// @ts-ignore
			items: response.transactionViewResponseList.map(({dealDate, ...rest}) => ({
				...rest,
				date: '10 march',
			})),
		};

		return goalTransactionScheme.parse(map);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function updateGoal({boardSavingId, payload}: {boardSavingId: number}) {
	if (!boardSavingId) {
		return {};
	}

	await HttpClient.put({
		url: getApiPath(`board-savings/${boardSavingId}/savings`),
		data: payload,
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
	updateGoal,
};
