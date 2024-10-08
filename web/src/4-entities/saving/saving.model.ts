import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {TSavingPaged} from './saving.types.ts';
import {TAppFilter} from '@shared/types';

function useBoardSavingsId() {
	const {data} = useQuery({
		queryKey: ['board-savings-id'],
		queryFn: () => savingApi.fetchBoardSavingsId(1),
	});

	return data;
}

function useTotalBalance() {
	const {data, isFetching} = useQuery({
		queryKey: ['board-savings-balance'],
		queryFn: () => savingApi.fetchBoardSavingsBalance(1),
	});

	return {balance: data, isBalanceFetching: isFetching};
}

function useItems(filter?: TAppFilter) {
	const boardSavingId = useBoardSavingsId();

	const {data, isFetching} = useQuery({
		queryKey: ['saving-items', filter],
		queryFn: () => savingApi.fetchItems({filter, boardSavingId}),
		enabled: !!boardSavingId,
		initialData: {} as TSavingPaged,
	});

	return {items: data.data, hasNext: data.hasNext, isItemsFetching: isFetching};
}

export const savingModel = {
	useItems,
	useTotalBalance,
};
