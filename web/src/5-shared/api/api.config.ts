import axios from 'axios';

export const devMode = process.env.NODE_ENV?.toString() === 'development';

export const axiosInstance = axios.create({
	baseURL: devMode ? 'http://localhost:8080' : 'https://api.finansy.io',
	headers: {
		'Content-Type': 'application/json',
		withCredentials: true,
	},
});
