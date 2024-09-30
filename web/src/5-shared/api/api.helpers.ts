import {AxiosResponse} from 'axios';

export function getApiPath(endpointURL: string) {
	return `/api/${endpointURL}`;
}

export function handleHttpClientResponse(response: Promise<AxiosResponse>) {
	return response.then((response) => response.data).catch((error) => Promise.reject(error));
}
