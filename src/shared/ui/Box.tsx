import {ReactNode} from 'react';
import {cn} from '@shared/lib';

type Props = {
	children: ReactNode;
	type?: 'subtitle' | 'title';
	isMainTitle?: unknown;
	className?: string;

	withMediumVertical?: unknown;
	withMediumVerticalTop?: unknown;
	withMediumVerticalBottom?: unknown;

	withBaseVertical?: unknown;
	withBaseVerticalTop?: unknown;
	withBaseVerticalBottom?: unknown;

	withBaseHorizontal?: unknown;
};

export function Box(props: Props) {
	const {
		children,
		type,
		isMainTitle,
		className,

		withMediumVertical,
		withMediumVerticalTop,
		withMediumVerticalBottom,

		withBaseVertical,
		withBaseVerticalTop,
		withBaseVerticalBottom,

		withBaseHorizontal,
	} = props;

	const boxClassName = cn(
		className,

		withMediumVertical && 'py-6',
		withMediumVerticalTop && 'pt-6',
		withMediumVerticalBottom && 'pb-6',

		withBaseVertical && 'py-4',
		withBaseVerticalTop && 'pt-4',
		withBaseVerticalBottom && 'pb-4',

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
