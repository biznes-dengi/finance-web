import {HttpClient} from '@shared/api/httpClient.ts';
import {Goal} from './goal.types.ts';

function fetchList(): Goal[] {
	return HttpClient.get();
}

export const goalApi = {
	fetchList,
};
