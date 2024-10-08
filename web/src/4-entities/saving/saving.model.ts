import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {TSavingPaged} from './saving.types.ts';
import {TAppFilter} from '@shared/types';
import {CURRENCY} from '@shared/constants';

function useBoardSavingsId() {
	const {data} = useQuery({
		queryKey: ['board-savings-id'],
		queryFn: () => savingApi.fetchBoardSavingsId(1),
	});

	return data;
}

function useBoardSavingsBalance() {
	const {data} = useQuery({
		queryKey: ['board-savings-balance'],
		queryFn: () => savingApi.fetchBoardSavingsBalance(1),
	});

	return {amount: data, currency: 'USD' as CURRENCY};
}

function useItems(filter?: TAppFilter) {
	const boardSavingId = useBoardSavingsId();

	return useQuery({
		queryKey: ['saving-items', filter],
		queryFn: () => savingApi.fetchItems({filter, boardSavingId}),
		enabled: !!boardSavingId,
		initialData: {} as TSavingPaged,
	});
}

export const savingModel = {
	useItems,
	useBoardSavingsBalance,
};
