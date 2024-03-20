import {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';

import {cn, isUndefined} from '@shared/lib';

import {APP_ICON, Icon} from '@shared/ui/index.ts';
import {ButtonOnClick} from '@shared/types';
import {boxShadow} from '@shared/constants';

export enum BUTTON_TYPE {
	circle = 'circle',
	block = 'block',
}

type Props = {
	children?: string | ReactNode;
	onClick: ButtonOnClick;
	type?: BUTTON_TYPE;
	icon?: APP_ICON;
	className?: string;
};

export function Button(props: Props) {
	const {children, onClick, type = BUTTON_TYPE.block, icon, className} = props;

	const navigate = useNavigate();

	const defaultButtonProps = {
		role: 'button',
		onClick: () => onClick({navigate}),
	};

	function getButtonClassName(buttonTypeClassName: string) {
		return cn('pointer', buttonTypeClassName, className);
	}

	if (type === BUTTON_TYPE.circle && !isUndefined(icon)) {
		return (
			<div {...defaultButtonProps} className={getButtonClassName('flex flex-col items-center')}>
				<Icon name={icon} className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary-violet' />
				{children && <div className='mt-1 text-primary-violet'>{children}</div>}
			</div>
		);
	}

	return (
		<div
			{...defaultButtonProps}
			className={getButtonClassName(`hover:bg-light-grey hover:${boxShadow} rounded-2xl p-4`)}
		>
			{children}
		</div>
	);
}
