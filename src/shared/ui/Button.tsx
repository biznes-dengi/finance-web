import {ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {cn, isUndefined} from '@shared/lib';

import {boxShadow} from '@shared/constants';

export enum BUTTON_TYPE {
	circle,
	primary,
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
	disabled?: boolean;
}

export function Button(props: Props) {
	const {children, onClick, type, icon, className, disabled} = props;

	const navigate = useNavigate();

	const defaultButtonProps = {
		role: 'button',
		onClick: () => onClick({navigate}),
	};

	function getButtonClassName(buttonClassName?: string) {
		return cn('pointer', buttonClassName, className);
	}

	if (type === BUTTON_TYPE.circle) {
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

	if (type === BUTTON_TYPE.primary) {
		return (
			<div
				{...defaultButtonProps}
				className={getButtonClassName(
					cn('rounded-2xl bg-black py-2 text-center text-white', disabled && 'bg-secondary-grey'),
				)}
				onClick={!disabled ? defaultButtonProps.onClick : undefined}
			>
				{children}
			</div>
		);
	}

	if (!isUndefined(icon)) {
		return (
			<div {...defaultButtonProps} className={getButtonClassName()}>
				{icon}
			</div>
		);
	}

	return (
		<div {...defaultButtonProps} className={getButtonClassName(`w-full ${boxShadow} rounded-2xl p-4`)}>
			{children}
		</div>
	);
}
