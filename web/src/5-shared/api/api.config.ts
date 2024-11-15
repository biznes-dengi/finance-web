import axios from 'axios';

export const devMode = process.env.NODE_ENV?.toString() === 'development';

export const axiosInstance = axios.create({
	baseURL: devMode ? 'http://localhost:8080' : 'http://finansy.io:8080',
	headers: {
		'Content-Type': 'application/json',
		// 'Access-Control-Allow-Origin': '*',
		// 'Access-Control-Request-Private-Network': true,
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
