import {Props} from '../types/Card.types.ts';
import {cn} from '@shared/lib';
import {Box} from '@shared/ui';

export function Card(props: Props) {
	const {titleInCard, title, rightTitle, children, withTitleSpace} = props;

	return (
		<>
			{(title || rightTitle) && (
				<div className={cn('flex pb-3', title && rightTitle && 'justify-between', withTitleSpace && 'pt-6')}>
					{title && <div className='font-semibold'>{title}</div>}
					{rightTitle}
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
