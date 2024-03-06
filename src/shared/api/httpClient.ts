import {AxiosError, AxiosResponse} from 'axios';
import {axiosInstance} from './config.ts';

// 1. add put, get, delete
// 2. add general error handling, 401, 403, error page

export class HttpClient {
	static post<P>(url: string, payload: P) {
		return axiosInstance.post(url, payload).then(handleGeneralPromiseResolve).catch(handleGeneralPromiseReject);
	}
}

function handleGeneralPromiseResolve<T>(response: AxiosResponse<T>) {
	return response.data;
}

function handleGeneralPromiseReject(error: AxiosError) {
	return Promise.reject(error);
}
