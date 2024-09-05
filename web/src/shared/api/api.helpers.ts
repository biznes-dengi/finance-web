import {Filter} from '@shared/api/api.types.ts';
import {isBoolean, isNumber, isString} from '@shared/lib';

export function getApiPath(endpointURL: string) {
	return `/api/${endpointURL}`;
}

export function getQueryParams(filter: Filter) {
	if (!filter) return '';

	const {page, pageSize, ...rest} = filter;

	const queryParams = [];

	if (page) {
		queryParams.push(`page=${page}`);
	}

	if (pageSize) {
		queryParams.push(`pageSize=${pageSize}`);
	}

	Object.keys(rest)
		.filter((key) => !!rest[key])
		.forEach((key) => {
			const value = rest[key];

			// if (isArray(value)) {
			// 	if (isEmpty(value)) return;
			//
			// 	return value.forEach((item: any) => {
			// 		const itemValue = item && typeof item === 'object' ? item.id || item.name : item ? item : null;
			//
			// 		queryParams.push(`${key}=${itemValue}`);
			// 	});
			// }

			// if (isObject(value)) {
			// 	return queryParams.push(`${key}=${value.id}`);
			// }

			if (isString(value) || isNumber(value) || isBoolean(value)) {
				queryParams.push(`${key}=${encodeURIComponent(value)}`);
			}
		});

	return queryParams.map((queryParam, index) => (index === 0 ? '?' + queryParam : '&' + queryParam)).join('');
}
