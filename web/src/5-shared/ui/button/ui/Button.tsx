import {ReactElement, ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {cn, styleElement} from '@shared/lib';
import {PRELOAD_SIZE, PreloadSkeleton} from '@shared/ui';
import {ClassValue} from 'clsx';

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

	function gcn(...buttonClassName: Array<ClassValue>) {
		return cn('block', disabled ? 'cursor-not-allowed' : 'cursor-pointer', ...buttonClassName, className);
	}

	if (type === ButtonType.main) {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'block w-full rounded-3xl py-3 text-center text-white',
					!disabled ? 'bg-primary-violet' : 'bg-secondary-grey',
				)}
			>
				{children}
			</button>
		);
	}

	if (type === ButtonType.text) {
		return (
			<button
				{...buttonProps}
				className={gcn('text-sm font-medium text-primary-violet', icon && 'flex items-center gap-2')}
			>
				{icon && styleElement(icon, 'size-4')}
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
					<div className='m-1 flex size-11 items-center justify-center rounded-full bg-secondary-violet text-primary-violet'>
						{styleElement(icon, icon.type === 'img' ? 'size-5' : 'size-[22px]')}
					</div>
				)}
				{children && <div className='mt-0.5 text-[13px] text-primary-violet'>{children}</div>}
			</button>
		);
	}
}
