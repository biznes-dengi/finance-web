export function cn(...classes: Array<undefined | null | string | boolean>) {
	return classes.filter(Boolean).join(' ');
}

export function cloneDeep<T>(value: T): T {
	if (typeof value !== 'object' || value === null) {
		return value;
	}

	if (Array.isArray(value)) {
		const newArray: any[] = [];
		for (const item of value) {
			newArray.push(cloneDeep(item));
		}
		return newArray as T;
	}

	const newObj: Record<string, any> = {};
	for (const key in value) {
		if (Object.prototype.hasOwnProperty.call(value, key)) {
			newObj[key] = cloneDeep(value[key]);
		}
	}
	return newObj as T;
}

export function isEmpty(value: any): boolean {
	if (value == null) {
		return true;
	}

	if (
		Array.isArray(value) ||
		typeof value === 'string' ||
		value instanceof String ||
		value instanceof Map ||
		value instanceof Set
	) {
		// @ts-ignore
		return value.length === 0;
	}

	if (typeof value === 'object') {
		return Object.keys(value).length === 0;
	}

	return false;
}

export function isEqual(value: any, other: any): boolean {
	if (value === other) {
		return true;
	}

	if (typeof value !== 'object' || typeof other !== 'object' || value === null || other === null) {
		return false;
	}

	const keysA = Object.keys(value);
	const keysB = Object.keys(other);

	if (keysA.length !== keysB.length) {
		return false;
	}

	for (const key of keysA) {
		if (!isEqual(value[key], other[key])) {
			return false;
		}
	}

	return true;
}

export function isObject(value: any): boolean {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isArray(value: any[]): boolean {
	return Array.isArray(value);
}

export function isNull(value: any): boolean {
	return value === null;
}

export function isNumber(value: any): boolean {
	return typeof value === 'number' && isFinite(value);
}

export function isString(value: any): boolean {
	return typeof value === 'string' || value instanceof String;
}

export function isUndefined(value: any): boolean {
	return value === undefined;
}

export function isBoolean(value: any): boolean {
	return typeof value === 'boolean';
}

export function get(object: any, path: string | string[], defaultValue: any = undefined): any {
	const keys = Array.isArray(path) ? path : path.split('.');

	let result = object;

	for (const key of keys) {
		if (result === null || result === undefined || !(key in result)) {
			return defaultValue;
		}
		result = result[key];
	}

	return result;
}
