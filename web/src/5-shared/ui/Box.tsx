import {ReactNode} from 'react';
import {cn} from '@shared/lib';
import {PreloadSkeleton} from '@shared/ui/preload-skeleton';

type Props = {
	children: ReactNode;
	className?: string;
	role?: string;
	title?: ReactNode;
	titleButton?: ReactNode;
	titleInCard?: ReactNode;
	isCard?: boolean;
	mediumMarginY?: unknown;
	baseMarginY?: unknown;
	baseMarginTop?: unknown;
	baseMarginBottom?: unknown;
	basePaddingX?: unknown;
	basePadding?: unknown;
	smallPaddingY?: unknown;
	isFetching?: unknown;
	skeletonClassName?: string;
	preloadWidth?: number;
	preloadHeight?: number;
};

export function Box(props: Props) {
	const {
		children,
		className,
		titleInCard,
		title,
		titleButton,
		isCard,
		mediumMarginY,
		baseMarginY,
		baseMarginTop,
		baseMarginBottom,
		basePaddingX,
		basePadding,
		isFetching,
		skeletonClassName,
		preloadWidth,
		preloadHeight,
	} = props;

	return (
		<div
			className={cn(
				mediumMarginY && 'my-6',
				baseMarginY && 'my-4',
				baseMarginTop && 'mt-4',
				baseMarginBottom && 'mb-4',

				basePadding && 'p-4',
				basePaddingX && 'px-4',
				isCard && 'rounded-2xl bg-white',
				className,
			)}
			role='box'
		>
			{(title || titleButton) && (
				<div className={cn('flex py-6 pb-3', title && titleButton && 'justify-between')}>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton}
				</div>
			)}

			{titleInCard && <div className={cn('py-3', !basePadding && !basePaddingX && 'px-4')}>{titleInCard}</div>}

			{isFetching ? (
				<PreloadSkeleton width={preloadWidth ?? 128} height={preloadHeight ?? 16} className={skeletonClassName} />
			) : (
				children
			)}
		</div>
	);
}
