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
	title?: ReactNode;
	cardTitle?: ReactNode;
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
		title,
		cardTitle,
		titleButton,
	} = props;

	return (
		<>
			{(title || titleButton) && (
				<div
					className={cn(
						'flex py-6 pb-3',
						title && titleButton && 'justify-between',
						!title && titleButton && 'justify-end',
					)}
				>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton && <div className='place-self-end text-primary-violet'>{titleButton}</div>}
				</div>
			)}
			<div
				role='box'
				className={cn(
					className,
					withMediumVertical && 'py-6',
					withMediumTop && 'pt-6',
					withBaseVertical && 'py-4',
					withBaseTop && 'pt-4',
					withBaseBottom && 'pb-4',
					withBaseHorizontal && 'px-4',
					isCard && 'rounded-2xl bg-white',
				)}
			>
				{cardTitle && <div className='px-4 py-3 text-sm text-primary-grey'>{cardTitle}</div>}
				{children}
			</div>
		</>
	);
}
