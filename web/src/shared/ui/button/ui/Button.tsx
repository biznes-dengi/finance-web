import {ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {cn} from '@shared/lib';

export enum BUTTON_TYPE {
	default,
	circle,
	primary,
	icon,
}

export interface CommonButtonSettings {
	icon?: ReactNode;
	type?: BUTTON_TYPE;
	onClick: ({navigate}: {navigate: NavigateFunction}) => void;
}
interface Props extends CommonButtonSettings {
	children?: string | ReactNode;
	className?: string;
	disabled?: boolean;
}

export function Button(props: Props) {
	const {children, onClick, type = BUTTON_TYPE.default, icon, className, disabled} = props;

	const navigate = useNavigate();

	const defaultButtonProps = {
		onClick: () => onClick({navigate}),
	};

	function getButtonClassName(...buttonClassNames: Array<unknown>) {
		return cn(disabled ? 'cursor-not-allowed' : 'cursor-pointer', ...buttonClassNames, className);
	}

	if (type === BUTTON_TYPE.primary) {
		return (
			<button
				{...defaultButtonProps}
				className={getButtonClassName(
					'block w-full rounded-2xl py-2 text-center text-white',
					!disabled && 'bg-primary-violet shadow-md shadow-primary-blue',
					disabled && 'bg-secondary-grey',
				)}
				onClick={!disabled ? defaultButtonProps.onClick : undefined}
			>
				{children}
			</button>
		);
	}

	if (type === BUTTON_TYPE.circle) {
		return (
			<button {...defaultButtonProps} className={getButtonClassName('flex w-fit flex-col items-center')}>
				{icon && (
					<div className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-secondary-violet')}>
						{icon}
					</div>
				)}
				{children && <div className='mt-1 text-primary-violet'>{children}</div>}
			</button>
		);
	}

	if (type === BUTTON_TYPE.icon) {
		return (
			<button {...defaultButtonProps} className={getButtonClassName('h-8 w-8')}>
				{children}
			</button>
		);
	}

	if (type === BUTTON_TYPE.default) {
		return (
			<button
				{...defaultButtonProps}
				className={getButtonClassName(
					'block w-full rounded-2xl bg-white p-4 text-left duration-300 hover:bg-light-grey hover:shadow-[0_0_0_4px_white_inset]',
				)}
			>
				{children}
			</button>
		);
	}
}
