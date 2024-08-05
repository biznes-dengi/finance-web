import {ReactNode} from 'react';
import {cn} from '@shared/lib';

type Props = {
	withMediumVertical?: unknown;
	withMediumTop?: unknown;
	withBaseVertical?: unknown;
	withBaseTop?: unknown;
	withBaseBottom?: unknown;
	withBaseHorizontal?: unknown;

	children: ReactNode;
	className?: string;
	isCard?: boolean;
	isList?: boolean;
	title?: ReactNode;
	inCardTitle?: ReactNode;
	titleButton?: ReactNode;
};

export function Box(props: Props) {
	const {
		withMediumVertical,
		withMediumTop,
		withBaseVertical,
		withBaseTop,
		withBaseBottom,
		withBaseHorizontal,

		children,
		className,
		isCard,
		isList,
		title,
		inCardTitle,
		titleButton,
	} = props;

	return (
		<>
			{(title || titleButton) && (
				<div
					role='card-title'
					className={cn(
						'flex py-6 pb-3',
						title && titleButton && 'justify-between',
						!title && titleButton && 'justify-end',
					)}
				>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton}
				</div>
			)}
			<div
				role='box'
				className={cn(
					withMediumVertical && 'my-6',
					withMediumTop && 'mt-6',
					withBaseVertical && 'my-4',
					withBaseTop && 'mt-4',
					withBaseBottom && 'mb-4',
					withBaseHorizontal && 'px-4',
					isCard && 'rounded-2xl bg-white',
					className,
				)}
			>
				{inCardTitle && (
					<div role='in-card-title' className='px-4 py-3 text-sm text-primary-grey'>
						{inCardTitle}
					</div>
				)}

				{isList ? <div className='p-1'>{children}</div> : children}
			</div>
		</>
	);
}
