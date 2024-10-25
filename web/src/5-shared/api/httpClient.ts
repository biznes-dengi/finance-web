import {axiosInstance} from './api.config.ts';
import {HttpClientMethodProps} from '@shared/api/api.types.ts';
import {getQueryString} from '@shared/lib';

export class HttpClient {
	static get({url, data, abortSignal}: HttpClientMethodProps): Promise<unknown> {
		if (data) {
			url += getQueryString(data);
		}

		return axiosInstance
			.get(url, {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}

	static post({url, data, abortSignal}: HttpClientMethodProps): Promise<unknown> {
		return axiosInstance
			.post(url, data, {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}

	static put({url, data, abortSignal}: HttpClientMethodProps): Promise<unknown> {
		return axiosInstance
			.put(url, data, {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}

	static delete({url, abortSignal}: HttpClientMethodProps): Promise<unknown> {
		return axiosInstance
			.delete(url, {signal: abortSignal})
			.then((response) => response.data)
			.catch((error) => Promise.reject(error));
	}
}
