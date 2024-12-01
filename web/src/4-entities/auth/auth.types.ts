import {number, object, string} from 'zod';

export const authUserValidator = object({
	id: number(),
	email: string(),
});
