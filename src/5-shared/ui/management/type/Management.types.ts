import {ReactNode} from 'react';
import {CURRENCY} from '@shared/constants';

export type ManagementProps<ListItem> = {
	isLoading: boolean;
	totalBalance: {
		amount: number;
		currency: CURRENCY;
	} | null;
	buttons: ReactNode[];
	listTitle: ReactNode;
	listItems: ListItem[] | null;
	renderListItem: (item: ListItem) => ReactNode;
	hasNextListPage: boolean;
	fetchNextListPage: () => void;
};
