import {cloneElement, ReactElement} from 'react';
import {twMerge} from 'tailwind-merge';

export function styleElement(element: ReactElement, className: string) {
	return cloneElement(element, {className});
}

export function cn(...classes: Array<unknown>) {
	return twMerge(classes.filter(Boolean).join(' '));
}

export function createGcn(generalClassName: string, className?: string) {
	return function (...buttonClassName: Array<unknown>) {
		return cn(generalClassName, ...buttonClassName, className);
	};
}
