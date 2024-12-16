import {isBoolean, isNull, isNumber, isString, isUndefined} from '@shared/lib';
import {type Payload} from '@shared/api';

export function getQueryString(filter: Payload) {
	if (!filter) return;

	const queryParams = [] as string[];

	Object.keys(filter).forEach((key) => {
		const value = filter[key];

		if (isUndefined(value) || isNull(value)) return;

		if (isString(value) && value.length) {
			queryParams.push(`${key}=${encodeURIComponent(value)}`);
		}

		if (isNumber(value) || isBoolean(value)) {
			queryParams.push(`${key}=${encodeURIComponent(value)}`);
		}

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
	});

	return queryParams.map((queryParam, index) => (index === 0 ? '?' + queryParam : '&' + queryParam)).join('');
}

export function parseQueryString<TFilter extends Payload>(queryString: string): TFilter {
	if (!queryString || queryString.length < 2) return {} as TFilter;

	const queryParams = queryString.slice(1).split('&');

	const filter = {} as Payload;

	queryParams.forEach((param) => {
		const [paramName, paramValue] = param.split('=');

		filter[paramName] = decodeURIComponent(paramValue);

		// const decodedValue = paramValue ? decodeURIComponent(paramValue) : '';

		// const isSearch = paramName === 'search';
		//
		// let isObject;
		//
		// try {
		// 	isObject = typeof JSON.parse(decodedValue) === 'object';
		// } catch (e) {
		// 	isObject = false;
		// }
		//
		// switch (true) {
		// 	case isObject: {
		// 		filter[paramName] = JSON.parse(decodedValue);
		// 		break;
		// 	}
		// 	case isSearch: {
		// 		filter[paramName] = decodedValue;
		// 		break;
		// 	}
		// 	default: {
		// 		filter[paramName] = decodedValue;
		// 		break;
		// 	}
		// }
	});

	return filter as TFilter;
}
