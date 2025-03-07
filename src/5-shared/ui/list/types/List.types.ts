import {ReactNode} from 'react';

export type EmptyTextKey = 'transactions' | 'goals' | 'assets' | 'wallets';

export type ListProps<R> = {
	items: readonly R[] | null;
	renderItem: (row: R, index: number) => ReactNode;
	isLoading?: boolean;
	fetchNextPage?: () => void;
	hasNextPage?: boolean;
	emptyTextKey?: EmptyTextKey;
};
