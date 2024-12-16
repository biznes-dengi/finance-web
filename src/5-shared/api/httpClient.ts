import {axiosInstance} from './api.config.ts';
import {type HttpClientParams} from './api.types.ts';
import {getApiPath} from './api.helpers.ts';
import {getQueryString} from '@shared/lib';

export class HttpClient {
	static get({url, data, abortSignal}: HttpClientParams['get']): Promise<unknown> {
		if (data) {
			url += getQueryString(data);
		}

		return axiosInstance
			.get(getApiPath(url), {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}

	static post({url, data, abortSignal}: HttpClientParams['post']): Promise<unknown> {
		return axiosInstance
			.post(getApiPath(url), data, {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}

	static put({url, data, abortSignal}: HttpClientParams['put']): Promise<unknown> {
		return axiosInstance
			.put(getApiPath(url), data, {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}

	static delete({url, abortSignal}: HttpClientParams['delete']): Promise<unknown> {
		return axiosInstance
			.delete(getApiPath(url), {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}
}
