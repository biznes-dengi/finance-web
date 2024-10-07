import {Props} from '../types/Card.types.ts';
import {cn} from '@shared/lib';
import {Box} from '@shared/ui';

export function Card(props: Props) {
	const {titleInCard, title, titleButton, children} = props;

	return (
		<div role='card' className='rounded-2xl bg-white'>
			{(title || titleButton) && (
				<div className={cn('flex py-6 pb-3', title && titleButton && 'justify-between')}>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton}
				</div>
			)}

			{titleInCard && (
				<Box basePaddingX className='py-3 text-sm font-medium text-primary-grey'>
					{titleInCard}
				</Box>
			)}

			{children}
		</div>
	);
}
