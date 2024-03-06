import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:5000/api/v1/',
	headers: {
		'Content-Type': 'application/json',
		// authorization: `Bearer ${AuthService.accessToken}`,
	},
	withCredentials: true,
});

export const setTokenToInstance = (token: string) => {
	localStorage.setItem('token', token);

	axiosInstance.interceptors.request.use((config) => {
		config.headers.authorization = localStorage.getItem('token');

		return config;
	});
};
