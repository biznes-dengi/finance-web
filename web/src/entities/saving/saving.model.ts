import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {TAppFilter} from '@shared/types';

function useItems(filter?: TAppFilter) {
	const queryState = useQuery({
		queryKey: ['savingItems', filter],
		queryFn: () => savingApi.fetchItems({filter: {...filter, userId: 1}}),
		initialData: [],
	});

	// use spread to cover the case if you need to return something more
	return {...queryState};
}

export const savingModel = {
	useItems,
};
