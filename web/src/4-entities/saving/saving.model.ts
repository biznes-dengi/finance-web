import {useQuery} from '@tanstack/react-query';
import {TAppFilter} from '@shared/types';
import {savingApi} from './saving.api.ts';
import {TSavingPaged} from './saving.types.ts';

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

	return {totalBalance: data, isTotalBalanceFetching: isFetching};
}

function useItems(filter?: TAppFilter) {
	const boardSavingId = useBoardSavingsId();

	const {data, isFetching} = useQuery({
		queryKey: ['saving-items', filter],
		queryFn: () => savingApi.fetchItems({filter, boardSavingId}),
		enabled: !!boardSavingId,
		initialData: {} as TSavingPaged,
	});

	return {
		//TODO
		// items: data.data as typeof data.data | undefined,
		// hasNext: data.hasNext as typeof data.hasNext | undefined,

		items: data.data,
		hasNext: data.hasNext,
		isItemsFetching: isFetching,
	};
}

export const savingModel = {
	useItems,
	useTotalBalance,
};
