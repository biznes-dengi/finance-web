import axios from 'axios';

const isLocalTunnelMode = true;
const isDevMode = process.env.NODE_ENV?.toString() === 'development';

export const axiosInstance = axios.create({
	baseURL: isDevMode && !isLocalTunnelMode ? 'http://localhost:8080' : 'https://api.finansy.io',
	headers: {
		'Content-Type': 'application/json',
		withCredentials: true,
	},
});
