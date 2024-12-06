import {type ApiParams, responseValidator} from './goal.types.ts';
import {HttpClient} from '@shared/api';

export class GoalApi {
	static async fetchItems({filter, boardGoalId}: ApiParams['fetchItems']) {
		const response = await HttpClient.get({
			url: `board-goals/${boardGoalId}/goals`,
			data: filter,
		});
		return responseValidator.fetchItems.parse(response);
	}

	static async fetchItem({boardGoalId, id}: ApiParams['fetchItem']) {
		const response = await HttpClient.get({
			url: `board-goals/${boardGoalId}/goals/${id}`,
		});
		return responseValidator.fetchItem.parse(response);
	}

	static async createItem({boardGoalId, payload}: ApiParams['createItem']) {
		const response = await HttpClient.post({
			url: `board-goals/${boardGoalId}/goals`,
			data: payload,
		});
		return responseValidator.createItem.parse(response);
	}

	static async updateItem({boardGoalId, id, payload}: ApiParams['updateItem']) {
		return await HttpClient.put({
			url: `board-goals/${boardGoalId}/goals/${id}`,
			data: payload,
		});
	}

	static async deleteItem({boardGoalId, id}: ApiParams['deleteItem']) {
		return await HttpClient.delete({
			url: `board-goals/${boardGoalId}/goals/${id}`,
		});
	}

	static async fetchItemTransactions({filter, boardGoalId, id}: ApiParams['fetchItemTransactions']) {
		const response = await HttpClient.get({
			url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
			data: filter,
		});
		return responseValidator.fetchItemTransactions.parse(response);
	}

	static async depositMoney({id, boardGoalId, payload}: ApiParams['depositMoney']) {
		return await HttpClient.post({
			url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
			data: payload,
		});
	}

	static async withdrawMoney({id, boardGoalId, payload}: ApiParams['withdrawMoney']) {
		return await HttpClient.post({
			url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
			data: payload,
		});
	}

	static async transferMoney({boardGoalId, payload}: ApiParams['transferMoney']) {
		return await HttpClient.post({
			url: `board-goals/${boardGoalId}/transfer`,
			data: payload,
		});
	}

	static async fetchBoardGoalId(accountId: number) {
		const response = await HttpClient.get({
			url: 'board-goals/id',
			data: {accountId},
		});
		return responseValidator.fetchBoardGoalId.parse(response);
	}

	static async fetchTotalBalance(boardGoalId: number) {
		const response = await HttpClient.get({
			url: 'board-goals/balance',
			data: {boardGoalId},
		});
		return responseValidator.fetchTotalBalance.parse(response);
	}
}
