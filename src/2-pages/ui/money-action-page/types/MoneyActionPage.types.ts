import {CURRENCY} from '@shared/constants';
import type {StatusTextKey} from '@shared/ui';

type ActionProps = {
	params: {id: number | string};
	payload: {amount: number; date: string};
};

type TransferProps = {
	payload: {
		fromItemId: string | number;
		fromItemAmount: number;
		toItemId: string | number;
		toItemAmount: number;
		date: string;
	};
};

type ItemData = {
	id: number | string;
	name: string;
	balance: {
		amount: number;
		currency: CURRENCY;
	};
};

type CommonProps = {
	itemDetails?: ItemData;
	items?: ItemData[];
	isItemDataLoading: boolean;
	successTextKey: StatusTextKey;
	errorTextKey: StatusTextKey;
	backPath: string;
};

export type FundWithdrawPageProps = CommonProps & {
	actionType: 'fund' | 'withdraw';
	action: (props: ActionProps) => void;
	isActionLoading: boolean;
	isActionSuccess: boolean;
	isActionError: boolean;
};

export type TransferPageProps = CommonProps & {
	transfer: (props: TransferProps) => void;
	isTransferLoading: boolean;
	isTransferSuccess: boolean;
	isTransferError: boolean;
};
