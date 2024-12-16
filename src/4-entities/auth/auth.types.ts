import {number, object, string} from 'zod';

export const responseValidator = {
	fetchAuthUser: object({
		id: number(),
		email: string(),
	}),
};
