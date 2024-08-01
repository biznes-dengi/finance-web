import {ReactNode} from 'react';
import {cn} from '@shared/lib';
import {Button} from '@shared/ui/button';

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
					{titleButton && <Button onClick={() => alert('q')}>{titleButton}</Button>}
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
				{cardTitle && <div className='px-4 py-3 text-sm text-primary-grey'>{cardTitle}</div>}
				{children}
			</div>
		</>
	);
}
