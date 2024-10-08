import {isAxiosError} from 'axios';

import {TApiMethodProps, getApiPath, HttpClient} from '@shared/api';
import {boardSavingValidator, savingPagedValidator, TSavingPaged} from './saving.types.ts';

class SavingApi {
	async fetchBoardSavingsId(accountId: number) {
		try {
			const response = await HttpClient.get({url: getApiPath('board-savings'), filter: {accountId}});
			return boardSavingValidator.parse(response).boardSavingId;
		} catch (error) {
			isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
			return undefined;
		}
	}

	async fetchBoardSavingsBalance(accountId: number) {
		try {
			const response = await HttpClient.get({url: getApiPath('board-savings'), filter: {accountId}});
			return boardSavingValidator.parse(response).boardBalance;
		} catch (error) {
			isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
			return undefined;
		}
	}

	async fetchItems({filter, boardSavingId}: TApiMethodProps & {boardSavingId?: number}) {
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
}

export const savingApi = new SavingApi();
