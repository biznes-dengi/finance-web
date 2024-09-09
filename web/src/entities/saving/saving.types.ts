import zod from 'zod';

export const savingValidator = zod.object({
	id: zod.number(),
	title: zod.string(),
	amount: zod.number(),
	targetAmount: zod.number(),
	// currency: zod.string() as CURRENCY,
});
