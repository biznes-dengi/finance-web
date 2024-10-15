import {isAxiosError} from 'axios';

import {getApiPath, HttpClient} from '@shared/api';
import {
	ApiFetchItemsParams,
	ApiFundGoalParams,
	boardSavingBalanceValidator,
	boardSavingIdValidator,
	savingPagedValidator,
	TSavingPaged,
} from './saving.types.ts';

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
		return {} as TSavingPaged;
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
		return {} as TSavingPaged;
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

export const savingApi = {
	fetchBoardSavingsId,
	fetchBoardSavingsBalance,
	fetchItems,
	fundGoal,
};
