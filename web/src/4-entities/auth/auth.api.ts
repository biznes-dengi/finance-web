import {getApiPath, HttpClient} from '@shared/api';
import {authService} from '@entities/auth/auth.service.ts';

class AuthApi {
	async signup(payload: any) {
		return await HttpClient.post({
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

			authService.startSession(`Bearer ${response}`);

			return response;
		} catch (error) {
			throw new Error('Login error');
		}
	}

	logout() {
		authService.endSession();
		return Promise.resolve();
	}
}

export const authApi = new AuthApi();
