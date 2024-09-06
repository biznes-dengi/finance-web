import {axiosInstance} from './api.config.ts';
import {HttpClientMethodProps} from '@shared/api/api.types.ts';
import {handleHttpClientResponse} from '@shared/api/api.helpers.ts';
import {getQueryString} from '@shared/lib';

export class HttpClient {
	static get<Data>({url, filter, abortSignal}: HttpClientMethodProps): Promise<Data> {
		if (filter) {
			url += getQueryString(filter);
		}

		return handleHttpClientResponse(axiosInstance.get(url, {signal: abortSignal}));
	}
}
