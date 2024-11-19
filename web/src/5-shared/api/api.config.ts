import axios from 'axios';

export const devMode = process.env.NODE_ENV?.toString() === 'development';

export const axiosInstance = axios.create({
	baseURL: devMode ? 'http://localhost:8080' : 'https://api.finansy.io',
	headers: {
		'Content-Type': 'application/json',
		withCredentials: true,
	},
});

// FUCHS -- httpClient.interceptors.response.use()

// const setTokenToInstance = (token: string) => {
// 	localStorage.setItem('token', token);
//
// 	axiosInstance.interceptors.request.use((lib) => {
// 		lib.headers.authorization = localStorage.getItem('token');
//
// 		return lib;
// 	});
// };
