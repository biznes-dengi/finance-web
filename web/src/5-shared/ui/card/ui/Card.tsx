import {CardProps} from '../types/Card.types.ts';
import {cn} from '@shared/lib';
import {Box} from '@shared/ui';

export function Card(props: CardProps) {
	const {title, rightTitle, titleInCard, children, isLoading} = props;

	return (
		<div>
			{(title || rightTitle) && (
				<div className={cn('flex pb-3', title && rightTitle && 'items-center justify-between')}>
					{title && <div className='font-semibold'>{title}</div>}
					{rightTitle}
				</div>
			)}

			<div role='card' className='w-full rounded-2xl bg-white'>
				{titleInCard && (
					<div className='px-4 py-3 text-sm font-medium text-primary-grey'>
						<Box isLoading={isLoading} loadingSkeletonClassName='my-0.5 h-4 w-10'>
							{titleInCard}
						</Box>
					</div>
				)}

				{children}
			</div>
		</div>
	);
}
