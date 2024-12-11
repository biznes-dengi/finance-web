import {ReactNode} from 'react';

export type ListProps<R> = {
	rows?: readonly R[];
	renderRow: (row: R, index: number) => ReactNode;
	isLoading?: boolean;
	emptyTextKey?: 'transactions' | 'goals';
};
