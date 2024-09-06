import {axiosInstance} from './api.config.ts';
import {HttpClientMethodProps} from '@shared/api/api.types.ts';
import {getQueryParams, handleHttpClientResponse} from '@shared/api/api.helpers.ts';

export class HttpClient {
	static get<Data>({url, filter, abortSignal}: HttpClientMethodProps): Promise<Data> {
		if (filter) {
			url += getQueryParams(filter);
		}

		return handleHttpClientResponse(axiosInstance.get(url, {signal: abortSignal}));
	}
}
