import {nativeEnum, number, object} from 'zod';
import {CURRENCY} from '@shared/constants';

export const balanceValidator = object({
	amount: number(),
	currency: nativeEnum(CURRENCY),
});
