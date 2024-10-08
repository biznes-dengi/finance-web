import zod from 'zod';
import {CURRENCY} from '@shared/constants';

export const boardSavingValidator = zod.object({
	boardSavingId: zod.number(),
	boardBalance: zod.number(),
});

export const savingValidator = zod.object({
	id: zod.number(),
	name: zod.string(),
	balance: zod.number(),
	targetAmount: zod.number().nullish(),
	currency: zod.nativeEnum(CURRENCY),
	image: zod.string().nullable(),
});

export const savingPagedValidator = zod.object({
	hasNext: zod.boolean(),
	data: savingValidator.array(),
});

export type TSavingPaged = zod.infer<typeof savingPagedValidator>;
