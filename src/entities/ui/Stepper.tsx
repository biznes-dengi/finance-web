import {ReactNode} from 'react';

import {Box} from '@shared/ui';

import {cn} from '@shared/lib';
import {boxShadow} from '@shared/constants';

type Props = {
	activeStepIndex: number;
	steps: ReactNode[];
};

export function Stepper(props: Props) {
	const {activeStepIndex, steps} = props;

	return (
		<>
			<Box withMediumVertical className={cn('flex justify-center')}>
				{Array.from({length: steps.length}).map((item, index) => (
					<div
						key={'' + item + index}
						className={cn(
							boxShadow,
							'h-2.5 w-12 rounded-2xl bg-primary-grey shadow-light-grey',
							activeStepIndex === index && 'bg-primary-blue',
						)}
					/>
				))}
			</Box>
			{steps[activeStepIndex]}
		</>
	);
}
