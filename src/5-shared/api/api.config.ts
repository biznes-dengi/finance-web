import axios from 'axios';
import {APP_PATH} from '@shared/constants';

const isLocalTunnelMode = true;
const isDevMode = process.env.NODE_ENV?.toString() === 'development';

export const axiosInstance = axios.create({
	baseURL: isDevMode && !isLocalTunnelMode ? 'http://localhost:8080' : 'https://api.finansy.io',
	headers: {
		'Content-Type': 'application/json',
		withCredentials: true,
	},
});

export function setupInterceptor(token: string) {
	axiosInstance.interceptors.request.use(
		(config: any) => {
			config.headers.authorization = token;
			return config;
		},
		(error) => {
			switch (error.response?.status) {
				case 401: {
					localStorage.removeItem('token');
					window.location.reload();
					break;
				}
				case 403: {
					alert('Access forbidden');
					break;
				}
				case 408: {
					alert('The timeout period elapsed');
					break;
				}
				case 500:
				case 501:
				case 502:
				case 503:
				case 504:
				case 505: {
					alert('An unexpected error has occurred');
					window.location.href = APP_PATH.home;
					break;
				}
			}
		},
	);
}
