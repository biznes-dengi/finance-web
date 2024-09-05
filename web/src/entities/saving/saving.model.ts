import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {Filter} from '@shared/api';

function useItems(filter?: Filter) {
	const queryState = useQuery({
		queryKey: ['savingItems'],
		queryFn: () => savingApi.fetchItems(filter),
		initialData: [],
	});

	// spread pattern instead of "return queryState" to cover the case if you need to return something else
	return {...queryState};
}

export const savingModel = {
	useItems,
};
