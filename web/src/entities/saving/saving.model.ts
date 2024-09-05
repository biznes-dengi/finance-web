import {useQuery} from '@tanstack/react-query';

import {savingApi} from './saving.api.ts';
import {Filter} from '@shared/api';

function useItems(filter?: Filter) {
	const queryState = useQuery({
		queryKey: ['goalData'],
		queryFn: () => savingApi.fetchItems(filter),
		initialData: [],
	});

	return {queryState};
}

export const savingModel = {
	useItems,
};
