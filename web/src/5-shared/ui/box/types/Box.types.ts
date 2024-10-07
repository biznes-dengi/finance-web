import {ReactNode} from 'react';

export type Props = {
	children: ReactNode;
	className?: string;
	mediumMarginY?: unknown;
	baseMarginY?: unknown;
	baseMarginTop?: unknown;
	baseMarginBottom?: unknown;
	basePaddingX?: unknown;
	basePadding?: unknown;
	smallPaddingY?: unknown;
	isFetching?: unknown;
	preloadClassName?: string;
	preloadWidth?: number;
	preloadHeight?: number;
};
