import {ReactNode} from 'react';

import {Box} from '@shared/ui';

import {cn} from '@shared/lib';

type Props = {
	imgSrc?: string;
	title: ReactNode;
	subtitle: ReactNode;
};

export function ListItem(props: Props) {
	const {title, subtitle} = props;

	return (
		<div className='flex items-center'>
			<div
				role='image'
				className={cn('mr-4 h-10 w-10 rounded-3xl border-2 border-dashed border-primary-violet bg-secondary-grey')}
			/>
			<div>
				<Box type='title'>{title}</Box>
				<Box type='subtitle'>{subtitle}</Box>
			</div>
		</div>
	);
}
