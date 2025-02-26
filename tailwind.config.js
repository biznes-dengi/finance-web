/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			// primary-contract / primary-system
			colors: {
				black: '#191C1F',

				'primary-grey': '#75808A',
				'secondary-grey': '#DFE3E7',
				'light-grey': '#F7F7F7',

				'primary-violet': '#805CF5',
				'secondary-violet': '#F2EEFE',

				'error-red': '#B51F2D',
				'secondary-error-red': '#FDE3E5',

				field: '#EDEFF2',
				'field-state': '#DFE3E7',
				'field-helper': '#75808A',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
