import zod from 'zod';

export const boardSavingValidator = zod.object({
	boardSavingId: zod.number(),
	boardBalance: zod.number(),
});

export const savingValidator = zod.object({
	id: zod.number(),
	name: zod.string(),
	balance: zod.number(),
	targetAmount: zod.number(),
	currency: zod.string(),
	image: zod.string().nullable(),
});

export const savingPagedValidator = zod.object({
	hasNext: zod.boolean(),
	savings: savingValidator.array(),
});

export type TSavingPaged = zod.infer<typeof savingPagedValidator>;
