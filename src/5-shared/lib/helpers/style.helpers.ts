import {cloneElement, ReactElement} from 'react';
import {twMerge} from 'tailwind-merge';
import {ClassValue, clsx} from 'clsx';

export function styleElement(element: ReactElement, className: string) {
	return cloneElement(element, {className});
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
