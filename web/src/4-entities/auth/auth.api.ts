import {getApiPath, HttpClient} from '@shared/api';
import {axiosInstance} from '@shared/api/api.config.ts';

class AuthApi {
	async register(payload: any) {
		await HttpClient.post({
			url: getApiPath('auth/register'),
			data: payload,
		});
	}

	async login(payload: any) {
		try {
			const response = await HttpClient.post({
				url: getApiPath('auth/login'),
				data: payload,
			});

			const token = `Bearer ${response}`;

			this.setupInterceptor(token);

			localStorage.setItem('token', token);

			return token;
		} catch (error) {
			throw new Error('Ошибка при авторизации');
		}
	}

	setupInterceptor(token: string) {
		axiosInstance.interceptors.request.use((config: any) => {
			config.headers.authorization = token;
			return config;
		});
	}

	logout() {
		localStorage.removeItem('token');
		return Promise.resolve();
	}
}

export const authApi = new AuthApi();
