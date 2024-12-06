import zod, {boolean, nativeEnum, number, object, string} from 'zod';
import {CURRENCY, TRANSACTION_TYPE} from '@shared/constants';
import {type Payload} from '@shared/api';

const balanceValidator = object({
	amount: number(),
	currency: nativeEnum(CURRENCY),
});

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

	createItem: object({
		id: number(),
		name: string(),
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
};

type MoneyTransaction = {
	boardGoalId: number;
	id: number;
	payload: {
		type: TRANSACTION_TYPE;
		amount: number;
		date: string;
	};
};

export type ApiParams = {
	fetchItems: {
		boardGoalId: number;
		filter?: Payload;
	};

	fetchItem: {
		boardGoalId: number;
		id: number;
	};

	createItem: {
		boardGoalId: number;
		payload: CreatePayload;
	};

	updateItem: {
		boardGoalId: number;
		id: number;
		payload: EditPayload;
	};

	deleteItem: {
		boardGoalId: number;
		id: number;
	};

	fetchItemTransactions: {
		boardGoalId: number;
		id: number;
		filter?: Payload;
	};

	depositMoney: MoneyTransaction;

	withdrawMoney: MoneyTransaction;

	transferMoney: {
		boardGoalId: number;
		payload: TransferPayload;
	};
};

//TODO: TODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODOTODO

export type ModelHooks = {
	useCreate: {
		CreatePayload: {
			name: string;
			targetAmount: number;
			currency: CURRENCY;
			deadline: string;
		};
	};
};

export type TSavingPaged = zod.infer<typeof goalItemsValidator>;

export type TransferPayload = {
	fromGoalId: number;
	fromGoalAmount: number;
	toGoalId: number;
	toGoalAmount: number;
	date: string;
};

export type MutationFundGoalPayload = {
	id: number;
	amount: number;
	date: string;
};

export type CreatePayload = {
	name: string;
	targetAmount: number;
	currency: CURRENCY;
	deadline: string;
};

export type EditPayload = {
	name: string;
	targetAmount: number | undefined | null;
	deadline: string;
	currency: CURRENCY;
};

export type DeletePayload = {
	id: number;
};
