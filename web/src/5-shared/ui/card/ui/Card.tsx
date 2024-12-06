import {Props} from '../types/Card.types.ts';
import {cn} from '@shared/lib';

export function Card(props: Props) {
	const {title, rightTitle, titleInCard, children, withTopSpace} = props;

	return (
		<div className={cn(withTopSpace && 'mt-6')}>
			{(title || rightTitle) && (
				<div className={cn('flex pb-3', title && rightTitle && 'justify-between')}>
					{title && <div className='font-semibold'>{title}</div>}
					{rightTitle}
				</div>
			)}

			<div role='card' className='w-full rounded-2xl bg-white'>
				{titleInCard && <div className='px-4 py-3 text-sm font-medium text-primary-grey'>{titleInCard}</div>}

				{children}
			</div>
		</div>
	);
}
