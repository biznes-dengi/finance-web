import {type AxiosResponse} from 'axios';
import {axiosInstance} from './api.config.ts';

function handleResponse(response: Promise<AxiosResponse>) {
	return response.then((response) => response.data).catch((error) => Promise.reject(error));
}

export class HttpClient {
	static get<Data>({url, abortSignal}: {url: string; abortSignal?: AbortSignal}): Promise<Data> {
		return handleResponse(axiosInstance.get(url, {signal: abortSignal}));
	}
}
