import {isAxiosError} from 'axios';

import {TApiMethodProps, getApiPath, HttpClient} from '@shared/api';
import {
	boardSavingBalanceValidator,
	boardSavingIdValidator,
	savingPagedValidator,
	TSavingPaged,
} from './saving.types.ts';

async function fetchBoardSavingsId(accountId: number) {
	try {
		const response = await HttpClient.get({url: getApiPath('board-savings/id'), filter: {accountId}});
		return boardSavingIdValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchBoardSavingsBalance(boardSavingId: number) {
	try {
		const response = await HttpClient.get({url: getApiPath('board-savings/balance'), filter: {boardSavingId}});
		return boardSavingBalanceValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return undefined;
	}
}

async function fetchItems({filter, boardSavingId}: TApiMethodProps & {boardSavingId?: number}) {
	if (!boardSavingId) {
		return {} as TSavingPaged;
	}

	try {
		const response = await HttpClient.get({
			url: getApiPath(`board-savings/${boardSavingId}/savings`),
			filter,
		});
		return savingPagedValidator.parse(response);
	} catch (error) {
		isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
		return {} as TSavingPaged;
	}
}

export const savingApi = {
	fetchBoardSavingsId,
	fetchBoardSavingsBalance,
	fetchItems,
};
