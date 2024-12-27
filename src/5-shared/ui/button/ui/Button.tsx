import {ReactElement, ReactNode, useState} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {ClassValue} from 'clsx';
import {cn, styleElement, useKeyClick, useResponsive} from '@shared/lib';
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
	disableDefaultEnterClick?: boolean;
}

// Typescript: when type = icon -> icon prop required

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
		disableDefaultEnterClick,
	} = props;

	const navigate = useNavigate();

	const {isDesktop} = useResponsive();

	const [displayBoxShadow, setDisplayBoxShadow] = useState(true);

	useKeyClick({
		key: 'Enter',
		onKeyDown: () => setDisplayBoxShadow(false),
		onKeyUp: () => {
			onClick({navigate});
			setDisplayBoxShadow(true);
		},
		disabled: disabled || disableDefaultEnterClick || type !== ButtonType.main,
		deps: [],
	});

	function gcn(...buttonClassName: Array<ClassValue>) {
		return cn(
			'block',
			disabled ? 'cursor-not-allowed' : 'active:scale-95 active:brightness-95 transition ease-in-out cursor-pointer',
			isDesktop ? 'duration-200' : 'duration-100',
			...buttonClassName,
			className,
		);
	}

	const buttonProps = {
		onClick: disabled ? undefined : () => onClick({navigate}),
		disabled,
	};

	if (type === ButtonType.main) {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'block w-full rounded-3xl p-3 text-center text-white active:scale-100 ',
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
					!displayBoxShadow && 'shadow-none',
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
					<div
						className={cn(
							'flex size-11 items-center justify-center rounded-full bg-secondary-violet  text-primary-violet',
							disabled && 'bg-secondary-violet/20  text-primary-violet/20',
						)}
					>
						{styleElement(icon, icon.type === 'img' ? 'size-5' : 'size-4')}
					</div>
				)}
				{children && (
					<div className={cn('mt-2 text-[13px] text-primary-violet', disabled && 'text-primary-violet/20')}>
						{children}
					</div>
				)}
			</button>
		);
	}
}
