import {goalApi} from './goal.api.ts';

function useData() {
	const rows = goalApi.fetchList();

	return {rows};
}

export const goalModel = {
	useData,
};
