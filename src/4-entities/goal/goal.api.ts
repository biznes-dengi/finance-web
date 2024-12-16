import {type ApiProps, responseValidator} from './goal.types.ts';
import {HttpClient} from '@shared/api';

export class GoalApi {
	static async fetchItemList(props: ApiProps['fetchItemList']) {
		const {
			params: {boardGoalId},
			payload,
		} = props;

		const response = await HttpClient.get({
			url: `board-goals/${boardGoalId}/goals`,
			data: payload,
		});

		return responseValidator.fetchItems.parse(response);
	}

	static async fetchItemDetails(props: ApiProps['fetchItemDetails']) {
		const {
			params: {boardGoalId, id},
		} = props;

		const response = await HttpClient.get({
			url: `board-goals/${boardGoalId}/goals/${id}`,
		});

		return responseValidator.fetchItem.parse(response);
	}

	static async fetchItemTransactions(props: ApiProps['fetchItemTransactions']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		const response = await HttpClient.get({
			url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
			data: payload,
		});

		return responseValidator.fetchItemTransactions.parse(response);
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

	static async createItem(props: ApiProps['createItem']) {
		const {
			params: {boardGoalId},
			payload,
		} = props;

		const response = await HttpClient.post({
			url: `board-goals/${boardGoalId}/goals`,
			data: payload,
		});

		return responseValidator.createItem.parse(response);
	}

	static async updateItem(props: ApiProps['updateItem']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		return await HttpClient.put({
			url: `board-goals/${boardGoalId}/goals/${id}`,
			data: payload,
		});
	}

	static async deleteItem(props: ApiProps['deleteItem']) {
		const {
			params: {boardGoalId, id},
		} = props;

		return await HttpClient.delete({
			url: `board-goals/${boardGoalId}/goals/${id}`,
		});
	}

	static async fundItem(props: ApiProps['depositMoney']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		await HttpClient.post({
			url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
			data: payload,
		});

		return {id};
	}

	static async withdrawItem(props: ApiProps['withdrawMoney']) {
		const {
			params: {boardGoalId, id},
			payload,
		} = props;

		await HttpClient.post({
			url: `board-goals/${boardGoalId}/goals/${id}/transactions`,
			data: payload,
		});

		return {id};
	}

	static async transferItem(props: ApiProps['transferMoney']) {
		const {
			params: {boardGoalId},
			payload,
		} = props;

		return await HttpClient.post({
			url: `board-goals/${boardGoalId}/transfer`,
			data: payload,
		});
	}
}
