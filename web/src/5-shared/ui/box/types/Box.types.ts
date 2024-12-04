import {ReactNode} from 'react';
import {ClassValue} from 'clsx';

export type BoxProps = {
	children?: ReactNode;
	className?: string;
	mediumMarginY?: ClassValue;
	baseMarginY?: ClassValue;
	baseMarginTop?: ClassValue;
	baseMarginBottom?: ClassValue;
	basePaddingX?: ClassValue;
	basePadding?: ClassValue;
	smallPaddingY?: ClassValue;

	baseSpaceWithoutTop?: ClassValue;

	isLoading?: boolean;
	preloadClassName?: string;
	preloadWidth?: number;
	preloadHeight?: number;
};
