import {axiosInstance} from '@shared/api/api.config.ts';

class AuthService {
	get token() {
		return localStorage.getItem('token');
	}

	startSession(token: string) {
		axiosInstance.interceptors.request.use((config: any) => {
			config.headers.authorization = token;
			return config;
		});

		localStorage.setItem('token', token);
	}

	endSession() {
		localStorage.removeItem('token');
	}
}

export const authService = new AuthService();
