import {responseValidator} from './auth.types.ts';
import {HttpClient} from '@shared/api';
import {APP_PATH} from '@shared/constants';

export class AuthApi {
	static getToken() {
		return localStorage.getItem('token');
	}

	static async fetchAuthUser() {
		const response = await HttpClient.get({
			url: 'users/me',
		});
		return responseValidator.fetchAuthUser.parse(response);
	}

	static async signup(payload: any) {
		const response = await HttpClient.post({
			url: 'auth/register',
			data: payload,
		});

		localStorage.setItem('token', `Bearer ${response}`);

		return response;
	}

	static async login(payload: any) {
		const response = await HttpClient.post({
			url: 'auth/login',
			data: payload,
		});

		localStorage.setItem('token', `Bearer ${response}`);

		return response;
	}

	static logout() {
		localStorage.removeItem('token');
		window.location.href = APP_PATH.login;
		return Promise.resolve();
	}
}
