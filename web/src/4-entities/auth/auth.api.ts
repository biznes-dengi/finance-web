import {getApiPath, HttpClient, axiosInstance} from '@shared/api';
import {authUserValidator} from '@entities/auth/auth.types.ts';
import {APP_PATH} from '@shared/constants';

class AuthApi {
	get token() {
		return localStorage.getItem('token');
	}

	setupInterceptor(token: string) {
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

	startSession(token: string) {
		localStorage.setItem('token', token);
	}

	endSession() {
		localStorage.removeItem('token');
		window.location.href = APP_PATH.login;
	}

	async fetchAuthUser() {
		const response = await HttpClient.get({url: getApiPath('users/me')});
		return authUserValidator.parse(response);
	}

	async signup(payload: any) {
		try {
			const response = await HttpClient.post({
				url: getApiPath('auth/register'),
				data: payload,
			});

			this.startSession(`Bearer ${response}`);

			return response;
		} catch (error) {
			throw new Error('Signup error');
		}
	}

	async login(payload: any) {
		try {
			const response = await HttpClient.post({
				url: getApiPath('auth/login'),
				data: payload,
			});

			this.startSession(`Bearer ${response}`);

			return response;
		} catch (error) {
			throw new Error('Login error');
		}
	}

	logout() {
		this.endSession();
		return Promise.resolve();
	}
}

export const authApi = new AuthApi();
