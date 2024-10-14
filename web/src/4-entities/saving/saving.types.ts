import zod from 'zod';
import {CURRENCY} from '@shared/constants';

export const boardSavingIdValidator = zod.number();

export const boardSavingBalanceValidator = zod.object({
	amount: zod.number(),
	currency: zod.nativeEnum(CURRENCY),
});

export const savingPagedValidator = zod.object({
	hasNext: zod.boolean(),
	data: zod
		.object({
			id: zod.number(),
			name: zod.string(),
			balance: zod.object({
				amount: zod.number(),
				currency: zod.nativeEnum(CURRENCY),
			}),
			targetAmount: zod.number().nullish(),
			image: zod.string().nullable(),
		})
		.array(),
});

export type TSavingPaged = zod.infer<typeof savingPagedValidator>;
