import {isAxiosError} from 'axios';

import {TApiMethodProps, getApiPath, HttpClient} from '@shared/api';
import {boardSavingValidator, savingPagedValidator, TSavingPaged} from './saving.types.ts';

class SavingApi {
	async fetchBoardSavingId(accountId: number) {
		try {
			const response = await HttpClient.get({url: getApiPath('board-saving'), filter: {accountId}});
			return boardSavingValidator.parse(response);
		} catch (error) {
			isAxiosError(error) ? console.error(error.response?.data.message) : console.error(error);
			return null;
		}
	}

	async fetchItems(props: TApiMethodProps & {boardSavingId: number | undefined}) {
		const {filter, boardSavingId} = props;

		if (!boardSavingId) {
			return {} as TSavingPaged;
		}

		try {
			const response = await HttpClient.get({
				url: getApiPath(`board-saving/${boardSavingId}/saving`),
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
