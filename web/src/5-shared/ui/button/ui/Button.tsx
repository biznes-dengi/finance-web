import {ReactElement, ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {cn, styleElement} from '@shared/lib';
import {PRELOAD_SIZE, PreloadSkeleton} from '@shared/ui';

export enum ButtonType {
	main,
	text,
	icon,
}

export interface CommonButtonSettings {
	icon?: ReactElement;
	type?: ButtonType;
	onClick: ({navigate}: {navigate: NavigateFunction}) => void;
}
interface Props extends CommonButtonSettings {
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
	isFetching?: boolean;
}

// TODO: Typescript: when type = icon -> icon prop required

export function Button(props: Props) {
	const {children, className, onClick, type = ButtonType.text, icon, disabled, isFetching} = props;

	const navigate = useNavigate();

	const buttonProps = {
		onClick: disabled ? undefined : () => onClick({navigate}),
		disabled,
	};

	function gcn(...buttonClassName: Array<unknown>) {
		return cn('block', disabled ? 'cursor-not-allowed' : 'cursor-pointer', ...buttonClassName, className);
	}

	if (type === ButtonType.main) {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'block w-full rounded-2xl py-2 text-center text-white',
					!disabled ? 'bg-primary-violet shadow-md shadow-primary-blue' : 'bg-secondary-grey',
				)}
			>
				{children}
			</button>
		);
	}

	if (type === ButtonType.text) {
		// svg-path size = 12x12
		return (
			<button {...buttonProps} className={gcn('text-sm font-medium text-primary-violet', icon && 'flex items-center')}>
				{icon && styleElement(icon, 'mr-2 size-4')}
				<span className='font-medium'>{children}</span>
			</button>
		);
	}

	if (type === ButtonType.icon) {
		if (isFetching) {
			return (
				<div className='flex flex-col items-center gap-y-3 py-1.5'>
					<PreloadSkeleton isCircular />
					<PreloadSkeleton width={48} height={PRELOAD_SIZE.height.xs} />
				</div>
			);
		}

		return (
			<button
				{...buttonProps}
				className={gcn(
					'flex transform flex-col items-center transition duration-200 ease-in-out active:scale-95 active:brightness-95',
				)}
			>
				{icon && (
					<div className='m-1 flex size-10 items-center justify-center rounded-full bg-secondary-violet text-primary-violet'>
						{styleElement(icon, icon.type === 'img' ? 'size-5' : 'size-6')}
					</div>
				)}
				{children && <div className='mt-1.5 text-sm text-primary-violet'>{children}</div>}
			</button>
		);
	}
}
