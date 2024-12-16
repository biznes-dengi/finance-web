import {CURRENCY} from '@shared/constants';
import type {StatusTextKey} from '@shared/ui';

type actionParams = {
	params: {id: number | string};
	payload: {amount: number; date: string};
};

export type ItemData = {
	id: number | string;
	name: string;
	balance: {
		amount: number;
		currency: CURRENCY;
	};
};

export type GoalDetailsTransactionPageProps = {
	itemDetails?: ItemData;
	items?: ItemData[];
	isItemDataLoading: boolean;
	actionType: 'fund' | 'withdraw';
	action: (params: actionParams) => void;
	isActionLoading: boolean;
	isActionSuccess: boolean;
	isActionError: boolean;
	successMessageKey: StatusTextKey;
	errorMessageKey: StatusTextKey;
	backPath: string;
};
