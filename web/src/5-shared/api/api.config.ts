import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
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
