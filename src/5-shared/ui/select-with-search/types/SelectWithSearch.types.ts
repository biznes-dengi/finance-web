import {CURRENCY} from '@shared/constants';

export type Props = {
	options?: {
		name: string;
		description: string;
		value: CURRENCY;
	}[];
	fetchOptions?: () => void;
	onChange: (value: CURRENCY) => void;
	value: CURRENCY | null | undefined;
};
