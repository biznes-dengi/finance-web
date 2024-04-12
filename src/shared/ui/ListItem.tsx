import {ReactNode} from 'react';

import {APP_ICON} from '@shared/ui/index.ts';

import {cn} from '@shared/lib';

type Props = {
	imgSrc?: string;
	name: ReactNode;
	description: ReactNode;
	checked?: boolean;
	amount?: string;
};

/**
 * Rename or move into button, used in list, in select just for same composition
 */

export function ListItem(props: Props) {
	const {name, description, checked, amount} = props;

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
			<div className='flex w-[calc(100%-40px-16px)] justify-between'>
				<div>
					<div className='mb-1 font-semibold'>{name}</div>
					<div className='text-sm font-light text-primary-grey'>{description}</div>
				</div>
				<div>{amount}</div>
			</div>
		</div>
	);
}
