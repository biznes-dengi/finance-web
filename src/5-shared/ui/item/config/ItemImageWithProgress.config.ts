import {ApexOptions} from 'apexcharts';

export const options = {
	chart: {
		type: 'donut',
		animations: {
			enabled: false,
		},
	},
	legend: {
		show: false,
	},
	dataLabels: {
		enabled: false,
	},
	tooltip: {
		enabled: false,
	},
	plotOptions: {
		pie: {
			donut: {
				size: '82%',
			},
		},
		dataLabels: {
			enabled: false,
		},
	},
	colors: ['#805CF5', '#DFE3E7'], // primary violet and secondary grey
} as ApexOptions;
