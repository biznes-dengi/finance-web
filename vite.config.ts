import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@app': path.resolve('src/1-app'),
			'@pages': path.resolve('src/2-pages'),
			'@widgets': path.resolve('src/3-widgets'),
			'@entities': path.resolve('src/4-entities'),
			'@shared': path.resolve('src/5-shared'),
		},
	},
});
