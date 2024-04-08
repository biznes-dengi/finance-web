import {ReactNode} from 'react';

import {APP_ICON, Box} from '@shared/ui';

import {cn} from '@shared/lib';

type Props = {
	imgSrc?: string;
	name: ReactNode;
	description: ReactNode;
	checked?: boolean;
};

/**
 * Rename or move into button, used in list, in select just for same composition
 */

export function ListItem(props: Props) {
	const {name, description, checked} = props;

	return (
		<div className={cn('flex items-center', checked && 'bg-secondary-violet')}>
			<div
				role='mask'
				className={cn(
					'relative mr-4 h-10 w-10 rounded-3xl border-2 border-dashed border-primary-violet bg-secondary-grey',
				)}
			>
				{checked && (
					<div
						className={cn(
							'shadow-[0_0_0_2px_white_inset]',
							'absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-violet text-white',
						)}
					>
						{APP_ICON.check}
					</div>
				)}
			</div>
			<div>
				<Box type='title'>{name}</Box>
				<Box type='subtitle'>{description}</Box>
			</div>
		</div>
	);
}
