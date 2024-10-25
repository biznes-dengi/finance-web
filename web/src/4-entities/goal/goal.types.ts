import zod from 'zod';
import {CURRENCY, TRANSACTION_TYPE} from '@shared/constants';
import {TApiData} from '@shared/api';

export const boardSavingIdValidator = zod.number();

export const boardSavingBalanceValidator = zod.object({
	amount: zod.number(),
	currency: zod.nativeEnum(CURRENCY),
});

const balanceScheme = zod.object({
	amount: zod.number(),
	currency: zod.nativeEnum(CURRENCY),
});

export const savingPagedValidator = zod.object({
	hasNext: zod.boolean(),
	items: zod
		.object({
			id: zod.number(),
			name: zod.string(),
			balance: balanceScheme,
			targetAmount: zod.number().nullish(),
			image: zod.string().nullable(),
		})
		.array(),
});

export type TSavingPaged = zod.infer<typeof savingPagedValidator>;

export type ApiFetchItemsParams = {
	filter?: TApiData;
	boardSavingId?: number;
};

export type MutationFundGoalPayload = {
	id: number;
	amount: number;
	date: string;
};
export type ApiFundGoalParams = {
	id: number;
	boardSavingId?: number;
	payload: {
		type: TRANSACTION_TYPE;
		amount: number;
		date: string;
	};
};

export type TransferPayload = {
	fromGoalId: number;
	fromGoalAmount: number;
	toGoalId: number;
	toGoalAmount: number;
	date: string;
};
export type TransferApiParams = {
	boardSavingId?: number;
	payload: TransferPayload;
};

export type CreatePayload = {
	name: string;
	targetAmount: number;
	currency: CURRENCY;
	deadline: string;
};
export type CreateApiParams = {
	boardSavingId?: number;
	payload: CreatePayload;
};
export const createResponseScheme = zod.object({
	id: zod.number(),
	name: zod.string(),
});

export const detailsValidator = zod.object({
	id: zod.number(),
	name: zod.string(),
	balance: balanceScheme,
	targetAmount: zod.number().nullish(),
	deadline: zod.string().nullish(),
});

export enum TRANSACTION_ENUM {
	DEPOSIT = 'DEPOSIT',
	WITHDRAW = 'WITHDRAW',
	TRANSFER = 'TRANSFER',
}

// TODO: goalTranferValidator and goalFundWithdrawValidator
// TODO: items[i] может быть type=transfer и там будет один validator, а может быть другой и будет другой валидатор

export const goalTransactionValidator = zod.object({
	hasNext: zod.boolean(),
	items: zod
		.object({
			id: zod.number(),
			type: zod.nativeEnum(TRANSACTION_ENUM),
			amount: zod.number().nullish(),
			date: zod.string().nullish(),

			fromGoalAmount: zod.number().nullish(),
			fromGoalName: zod.string().nullish(),
			toGoalAmount: zod.number().nullish(),
			toGoalName: zod.string().nullish(),
		})
		.array(),
});

export type EditPayload = {
	name?: string;
	targetAmount?: number;
	deadline?: string;
	currency?: CURRENCY;
};
export type EditApiParams = {
	boardSavingId?: number;
	goalId?: string;
	payload: EditPayload;
};

export type DeletePayload = {
	id: number;
};
export type DeleteApiParams = {
	id: number;
	boardSavingId?: number;
};
