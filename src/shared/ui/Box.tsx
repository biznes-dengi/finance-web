import {ReactNode} from 'react';
import {cn} from '@shared/lib';

type Props = {
	children: ReactNode;
	type?: 'subtitle' | 'title';
	isMainTitle?: unknown;
	className?: string;

	withMediumVertical?: unknown;
	withMediumTop?: unknown;
	withMediumBottom?: unknown;

	withBaseVertical?: unknown;
	withBaseTop?: unknown;
	withBaseBottom?: unknown;

	withBaseHorizontal?: unknown;
};

export function Box(props: Props) {
	const {
		children,
		type,
		isMainTitle,
		className,

		withMediumVertical,
		withMediumTop,
		withMediumBottom,

		withBaseVertical,
		withBaseTop,
		withBaseBottom,

		withBaseHorizontal,
	} = props;

	const boxClassName = cn(
		className,

		withMediumVertical && 'py-6',
		withMediumTop && 'pt-6',
		withMediumBottom && 'pb-6',

		withBaseVertical && 'py-4',
		withBaseTop && 'pt-4',
		withBaseBottom && 'pb-4',

		withBaseHorizontal && 'px-4',
	);

	if (type === 'title') {
		return <div className={cn('mb-1 font-semibold', !!isMainTitle && 'text-2xl', boxClassName)}>{children}</div>;
	}

	if (type === 'subtitle') {
		return <div className={cn('text-sm font-light text-primary-grey', boxClassName)}>{children}</div>;
	}

	return <div className={boxClassName}>{children}</div>;
}
