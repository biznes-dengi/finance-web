import {ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {cn, isUndefined} from '@shared/lib';

import {boxShadow} from '@shared/constants';

export enum BUTTON_TYPE {
	circle = 'circle',
	block = 'block',
}

interface CommonButtonSettings {
	icon?: ReactNode;
	type?: BUTTON_TYPE;
	onClick: ({navigate}: {navigate: NavigateFunction}) => void;
}

export interface ButtonConfig extends CommonButtonSettings {
	name: string;
}

interface Props extends CommonButtonSettings {
	children?: string | ReactNode;
	className?: string;
}

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
			<div {...defaultButtonProps} className={getButtonClassName('flex w-fit flex-col items-center')}>
				{icon && (
					<div className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-secondary-violet')}>
						{icon}
					</div>
				)}
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
