import {Box} from '@shared/ui';

import {cn} from '@shared/lib';
import {boxShadow} from '@shared/constants';

export function GoalCreatePage() {
	const hints = ['hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint'];

	return (
		<>
			<div className={cn('h-[293px] bg-secondary-grey px-4 pt-2')}>
				<div role='header px-4'>{'<-'}</div>
				<Box withMediumVertical className={cn('text-4xl font-bold')}>
					Invest
				</Box>
			</div>

			<div className={cn('h-[374px]')}>
				<Box withMediumVertical className={cn('flex justify-center')}>
					<div className={cn('text-primary-grey')}>* * *</div>
				</Box>
				<Box withBaseHorizontal>
					<div className={cn('border-2 border-primary-violet')}>input</div>{' '}
				</Box>
				<Box withMediumVerticalTop withBaseHorizontal className={cn('flex flex-wrap')}>
					{hints.map((hint) => (
						<div key={hint} className={cn(boxShadow, 'w-fit rounded-2xl bg-secondary-grey px-3 py-1')}>
							{hint}
						</div>
					))}
				</Box>
			</div>
		</>
	);
}
