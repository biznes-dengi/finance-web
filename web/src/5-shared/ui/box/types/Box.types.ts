import {ReactNode} from 'react';
import {ClassValue} from 'clsx';

export type Props = {
	children: ReactNode;
	className?: string;
	mediumMarginY?: ClassValue;
	baseMarginY?: ClassValue;
	baseMarginTop?: ClassValue;
	baseMarginBottom?: ClassValue;
	basePaddingX?: ClassValue;
	basePadding?: ClassValue;
	smallPaddingY?: ClassValue;

	baseSpaceWithoutTop?: ClassValue;

	isFetching?: boolean;
	preloadClassName?: string;
	preloadWidth?: number;
	preloadHeight?: number;
};
