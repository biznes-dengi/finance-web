import {ReactElement, ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {ClassValue} from 'clsx';
import {cn, styleElement} from '@shared/lib';
import {PreloadSkeleton, Spinner} from '@shared/ui';
import './Button.css';

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
	isLoading?: boolean;
	isOnlyIcon?: boolean;
	isSecondary?: boolean;
}

// TODO: Typescript: when type = icon -> icon prop required

export const buttonClickStyles = 'transition duration-200 ease-in-out active:scale-95 active:brightness-95';

export function Button(props: Props) {
	const {
		children,
		className,
		onClick,
		type = ButtonType.text,
		isSecondary,
		icon,
		disabled,
		isLoading,
		isOnlyIcon,
	} = props;

	const navigate = useNavigate();

	const buttonProps = {
		onClick: disabled ? undefined : () => onClick({navigate}),
		disabled,
	};

	function gcn(...buttonClassName: Array<ClassValue>) {
		return cn(
			'block',
			buttonClickStyles,
			disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			...buttonClassName,
			className,
		);
	}

	if (type === ButtonType.main) {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'block w-full rounded-3xl py-3 text-center text-white active:scale-100',
					disabled
						? isSecondary
							? 'cursor-not-allowed bg-secondary-violet/20'
							: 'cursor-not-allowed bg-primary-violet/20'
						: isSecondary
						? 'bg-secondary-violet text-primary-violet'
						: 'primaryButtonShadow bg-primary-violet active:shadow-none',
					isLoading &&
						(isSecondary
							? 'cursor-not-allowed bg-secondary-violet'
							: 'cursor-not-allowed bg-primary-violet shadow-none'),
				)}
			>
				{isLoading ? (
					<div className='flex items-center justify-center gap-2'>
						<div className='relative'>
							<Spinner className='absolute -left-7 top-1 text-white' />
							{children}
						</div>
					</div>
				) : (
					children
				)}
			</button>
		);
	}

	if (type === ButtonType.text) {
		return (
			<button
				{...buttonProps}
				className={gcn('w-fit text-sm font-medium text-primary-violet', icon && 'flex items-center gap-2')}
			>
				{icon && styleElement(icon, 'size-3')}
				<span>{children}</span>
			</button>
		);
	}

	if (type === ButtonType.icon) {
		/* если меняются стили у кнопки, смотреть и за стилями для preloadSkeleton */

		if (isLoading) {
			return (
				<div className='flex flex-col items-center gap-y-3'>
					<PreloadSkeleton isCircular className='size-11' />
					<PreloadSkeleton className='h-[15.5px] w-12' />
				</div>
			);
		}

		if (isOnlyIcon) {
			return (
				<button {...buttonProps} className={gcn('flex flex-col items-center')}>
					{icon}
				</button>
			);
		}

		return (
			<button {...buttonProps} className={gcn('flex flex-col items-center')}>
				{icon && (
					<div className='flex size-11 items-center justify-center rounded-full bg-secondary-violet  text-primary-violet'>
						{styleElement(icon, icon.type === 'img' ? 'size-5' : 'size-4')}
					</div>
				)}
				{children && <div className='mt-2 text-[13px] text-primary-violet'>{children}</div>}
			</button>
		);
	}
}
