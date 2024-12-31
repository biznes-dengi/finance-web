import {type ApiProps, responseValidator} from './goal.types.ts';
import {HttpClient} from '@shared/api';

export class GoalApi {
	static async fetchItems(props: ApiProps['fetchItemList']) {
		const {
			params: {boardGoalId},
			payload,
		} = props;

		// try-catch чтобы выводить в консоль ZodError
		try {
			const response = await HttpClient.get({
				url: `board-goals/${boardGoalId}/goals`,
				data: payload,
			});

			return responseValidator.fetchItems.parse(response);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async fetchItemDetails(props: ApiProps['fetchItemDetails']) {
		const {
			params: {boardGoalId, id},
		} = props;

		try {
			const response = await HttpClient.get({
				url: `board-goals/${boardGoalId}/goals/${id}`,
			});

			return responseValidator.fetchItem.parse(response);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async fetchItemTransactions(props: ApiProps['fetchItemTransactions']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		try {
			const response = await HttpClient.get({
				url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
				data: payload,
			});

			return responseValidator.fetchItemTransactions.parse(response);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async fetchBoardGoalId(accountId: number) {
		try {
			const response = await HttpClient.get({
				url: 'board-goals/id',
				data: {accountId},
			});
			return responseValidator.fetchBoardGoalId.parse(response);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async fetchTotalBalance(boardGoalId: number) {
		try {
			const response = await HttpClient.get({
				url: 'board-goals/balance',
				data: {boardGoalId},
			});
			return responseValidator.fetchTotalBalance.parse(response);
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	static async createItem(props: ApiProps['createItem']) {
		const {
			params: {boardGoalId},
			payload,
		} = props;

		try {
			const response = await HttpClient.post({
				url: `board-goals/${boardGoalId}/goals`,
				data: payload,
			});

			return responseValidator.createItem.parse(response);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async updateItem(props: ApiProps['updateItem']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		try {
			return await HttpClient.put({
				url: `board-goals/${boardGoalId}/goals/${id}`,
				data: payload,
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async deleteItem(props: ApiProps['deleteItem']) {
		const {
			params: {boardGoalId, id},
		} = props;

		try {
			return await HttpClient.delete({
				url: `board-goals/${boardGoalId}/goals/${id}`,
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async fundItem(props: ApiProps['depositMoney']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		try {
			await HttpClient.post({
				url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
				data: payload,
			});

			return {id};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async withdrawItem(props: ApiProps['withdrawMoney']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		try {
			await HttpClient.post({
				url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
				data: payload,
			});

			return {id};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async transferItem(props: ApiProps['transferMoney']) {
		const {
			params: {boardGoalId},
			payload,
		} = props;

		try {
			await HttpClient.post({
				url: `board-goals/${boardGoalId}/transfer`,
				data: payload,
			});

			return {id: payload.fromGoalId};
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
