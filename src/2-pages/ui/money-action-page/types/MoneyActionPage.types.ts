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

export type ItemData = {
	id: number | string;
	name: string;
	balance: {
		amount: number;
		currency: CURRENCY;
	};
};

type CommonProps = {
	itemDetails?: ItemData | null;
	items?: ItemData[] | null;
	fetchNextOptions?: () => void;
	hasNextOptions?: boolean;
	isItemDataLoading: boolean;
	successTextKey: StatusTextKey;
	errorTextKey: StatusTextKey;
	backPath: string;
};

export type FundWithdrawPageProps = CommonProps & {
	actionType: 'fund' | 'withdraw';
	action: (props: ActionProps) => void;
	isActionPending: boolean;
	isActionSuccess: boolean;
	isActionError: boolean;
};

export type TransferPageProps = CommonProps & {
	transfer: (props: TransferProps) => void;
	isTransferPending: boolean;
	isTransferSuccess: boolean;
	isTransferError: boolean;
};
