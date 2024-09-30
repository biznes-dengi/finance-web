import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {TSavingPaged} from './saving.types.ts';
import {TAppFilter} from '@shared/types';

function useBoardSavingData() {
	const {data} = useQuery({
		queryKey: ['board-saving-id'],
		queryFn: () => savingApi.fetchBoardSavingId(1),
	});

	return data;
}

function useItems(filter?: TAppFilter) {
	const boardSavingId = useBoardSavingData();

	return useQuery({
		queryKey: ['saving-items', filter],
		queryFn: () => savingApi.fetchItems({filter, boardSavingId}),
		enabled: !!boardSavingId,
		initialData: {} as TSavingPaged,
	});
}

export const savingModel = {
	useItems,
};
