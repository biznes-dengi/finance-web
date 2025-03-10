import {ReactNode} from 'react';
import {CURRENCY} from '@shared/constants';
import {EmptyTextKey} from '@shared/ui/list/types/List.types.ts';
import {ItemProps} from '@shared/ui/item/types/Item.types.ts';
import type {ButtonConfig} from '@shared/ui';

export type ManagementSettingsConfigs = ItemProps[][];

export type ManagementProps<ListItem> = {
	isLoading: boolean;
	totalBalance: {amount: number; currency: CURRENCY} | null;
	totalBalanceDescription: ReactNode;
	buttonConfigs: ButtonConfig[];
	listTitle: ReactNode;
	listItems: ListItem[] | null;
	renderListItem: (item: ListItem) => ReactNode;
	hasNextListPage: boolean;
	fetchNextListPage: () => void;
	emptyListTextKey: EmptyTextKey;
	isButtonsSpaceBetween?: boolean;
	rightNode?: ReactNode;
	// settingsConfigs?: ManagementSettingsConfigs;
};
