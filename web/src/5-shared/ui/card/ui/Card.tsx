import {Props} from '../types/Card.types.ts';
import {cn} from '@shared/lib';
import {Box} from '@shared/ui';

export function Card(props: Props) {
	const {titleInCard, title, titleButton, children} = props;

	return (
		<>
			{(title || titleButton) && (
				<div className={cn('flex py-6 pb-3', title && titleButton && 'justify-between')}>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton}
				</div>
			)}

			<div role='card' className='w-full rounded-2xl bg-white'>
				{titleInCard && (
					<Box basePaddingX className='py-3 text-sm font-medium text-primary-grey'>
						{titleInCard}
					</Box>
				)}

				{children}
			</div>
		</>
	);
}
