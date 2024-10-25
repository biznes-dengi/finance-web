import {cn} from '@shared/lib';
import {PreloadSkeleton} from '@shared/ui/preload-skeleton';
import {Props} from '../types/Box.types.ts';

export function Box(props: Props) {
	const {
		children,
		className,
		mediumMarginY,
		baseMarginY,
		baseMarginTop,
		baseMarginBottom,
		basePaddingX,
		basePadding,
		baseSpaceWithoutTop,
		isFetching,
		preloadClassName,
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
				baseSpaceWithoutTop && 'p-4 pt-0',
				className,
			)}
			role='box'
		>
			{isFetching ? (
				<PreloadSkeleton width={preloadWidth ?? 128} height={preloadHeight ?? 16} className={preloadClassName} />
			) : (
				children
			)}
		</div>
	);
}
