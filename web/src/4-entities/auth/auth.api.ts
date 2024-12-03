import {getApiPath, HttpClient} from '@shared/api';
import {authUserValidator} from '@entities/auth/auth.types.ts';
import {APP_PATH} from '@shared/constants';

class AuthApi {
	get token() {
		return localStorage.getItem('token');
	}

	async fetchAuthUser() {
		const response = await HttpClient.get({url: getApiPath('users/me')});
		return authUserValidator.parse(response);
	}

	async signup(payload: any) {
		const response = await HttpClient.post({
			url: getApiPath('auth/register'),
			data: payload,
		});

		localStorage.setItem('token', `Bearer ${response}`);

		return response;
	}

	async login(payload: any) {
		const response = await HttpClient.post({
			url: getApiPath('auth/login'),
			data: payload,
		});

		localStorage.setItem('token', `Bearer ${response}`);

		return response;
	}

	logout() {
		localStorage.removeItem('token');
		window.location.href = APP_PATH.login;
		return Promise.resolve();
	}
}

export const authApi = new AuthApi();
