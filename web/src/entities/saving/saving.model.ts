import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {TAppFilter} from '@shared/types';

function useItems(filter?: TAppFilter) {
	const queryState = useQuery({
		queryKey: ['savingItems', filter],
		queryFn: () => savingApi.fetchItems({filter: {...filter, userId: 1}}),
		initialData: [],
	});

	// spread pattern instead of "return queryState" to cover the case if you need to return something else
	return {...queryState};
}

export const savingModel = {
	useItems,
};
