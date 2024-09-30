import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {TSavingPaged} from './saving.types.ts';
import {TAppFilter} from '@shared/types';

function useBoardSavingData() {
	const {data} = useQuery({
		queryKey: ['board-saving-data'],
		queryFn: () => savingApi.fetchBoardSavingId(1),
	});

	if (!data) {
		return;
	}

	return data.boardSavingId;
}

function useItems(filter?: TAppFilter) {
	const boardSavingId = useBoardSavingData();

	const queryState = useQuery({
		queryKey: ['saving-items', filter],
		queryFn: () => savingApi.fetchItems({filter, boardSavingId}),
		enabled: !!boardSavingId,
		initialData: {} as TSavingPaged,
	});

	// use spread to cover the case if you need to return something more
	return {...queryState};
}

export const savingModel = {
	useItems,
};
