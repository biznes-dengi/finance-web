import {ReactNode} from 'react';

export type ListProps<R> = {
	items: readonly R[] | null;
	renderItem: (row: R, index: number) => ReactNode;
	isLoading?: boolean;
	fetchNextPage?: () => void;
	hasNextPage?: boolean;
	emptyTextKey?: 'transactions' | 'goals';
};
