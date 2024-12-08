import zod, {boolean, nativeEnum, number, object, string} from 'zod';
import {CURRENCY, TRANSACTION_TYPE} from '@shared/constants';
import {type Payload} from '@shared/api';
import {balanceValidator} from '@shared/types';

export type Props = {
	useItemList: {
		filter?: Payload;
	};

	useItemDetails: {
		id: number;
	};

	useItemTransactions: {
		id: number;
		filter?: Payload;
	};
};

export type InitialData = {
	useItemList: zod.infer<typeof responseValidator.fetchItems>;
};

export type MutationProps = {
	useCreateItem: {
		payload: {
			name: string;
			targetAmount: number;
			currency: CURRENCY;
			deadline: string;
		};
	};

	useUpdateItem: {
		params: {
			id: number;
		};
		payload: {
			name: string;
			targetAmount: number | undefined | null;
			deadline: string;
			currency: CURRENCY;
		};
	};

	useDeleteItem: {
		params: {
			id: number;
		};
	};

	useDeposit: {
		params: {
			id: number;
		};
		payload: {
			amount: number;
			date: string;
		};
	};

	useWithdraw: {
		params: {
			id: number;
		};
		payload: {
			amount: number;
			date: string;
		};
	};

	useTransfer: {
		payload: {
			fromGoalId: number;
			fromGoalAmount: number;
			toGoalId: number;
			toGoalAmount: number;
			date: string;
		};
	};
};

export type ApiProps = {
	fetchItemList: {
		params: {boardGoalId: number};
		payload: Props['useItemList']['filter'];
	};

	fetchItemDetails: {
		params: {id: Props['useItemDetails']['id']; boardGoalId: number};
	};

	fetchItemTransactions: {
		params: {id: Props['useItemTransactions']['id']; boardGoalId: number};
		payload: Props['useItemTransactions']['filter'];
	};

	createItem: {
		params: {boardGoalId: number};
		payload: MutationProps['useCreateItem']['payload'];
	};

	updateItem: {
		params: MutationProps['useUpdateItem']['params'] & {boardGoalId: number};
		payload: MutationProps['useUpdateItem']['payload'];
	};

	deleteItem: {
		params: MutationProps['useDeleteItem']['params'] & {boardGoalId: number};
	};

	depositMoney: {
		params: MutationProps['useDeposit']['params'] & {boardGoalId: number};
		payload: MutationProps['useDeposit']['payload'] & {type: TRANSACTION_TYPE};
	};

	withdrawMoney: {
		params: MutationProps['useWithdraw']['params'] & {boardGoalId: number};
		payload: MutationProps['useWithdraw']['payload'] & {type: TRANSACTION_TYPE};
	};

	transferMoney: {
		params: {boardGoalId: number};
		payload: MutationProps['useTransfer']['payload'];
	};
};

export const responseValidator = {
	fetchItems: object({
		hasNext: boolean(),
		items: object({
			id: number(),
			name: string(),
			balance: balanceValidator,
			targetAmount: number().nullish(),
			image: string().nullable(),
		}).array(),
	}),

	fetchItem: object({
		id: number(),
		name: string(),
		balance: balanceValidator,
		targetAmount: number().nullish(),
		deadline: string().nullish(),
	}),

	// items[i] может быть type=transfer и там будет один validator, а может быть другой и будет другой валидатор
	fetchItemTransactions: object({
		hasNext: boolean(),
		items: zod
			.object({
				id: number(),
				type: nativeEnum(TRANSACTION_TYPE),
				amount: number().nullish(),
				date: string().nullish(),

				fromGoalAmount: number().nullish(),
				fromGoalName: string().nullish(),
				toGoalAmount: number().nullish(),
				toGoalName: string().nullish(),
			})
			.array(),
	}),

	fetchBoardGoalId: number(),

	fetchTotalBalance: balanceValidator,

	createItem: object({
		id: number(),
		name: string(),
	}),
};
