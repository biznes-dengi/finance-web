import {ReactElement, ReactNode, useState} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {ClassValue} from 'clsx';
import {cn, styleElement, useKeyClick, useResponsive} from '@shared/lib';
import {PreloadSkeleton, Spinner} from '@shared/ui';
import './Button.css';

export interface CommonButtonSettings {
	icon?: ReactElement;
	type: 'primary' | 'secondary' | 'text' | 'circle' | 'icon';
	onClick: ({navigate}: {navigate: NavigateFunction}) => void;
}
interface Props extends CommonButtonSettings {
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
	isLoading?: boolean;
	isPending?: boolean;
	disabledPrimaryButtonEnterClick?: boolean;
	secondaryWithPrimaryStyles?: boolean;
}

/** если меняются стили у кнопки, смотреть и за стилями для preloadSkeleton **/

export function Button(props: Props) {
	const {
		type = 'text',
		children,
		className,
		onClick,
		icon,
		disabled,
		isLoading,
		isPending,
		disabledPrimaryButtonEnterClick,
		secondaryWithPrimaryStyles,
	} = props;

	const navigate = useNavigate();

	const [displayBoxShadow, setDisplayBoxShadow] = useState(true);

	const {isDesktop} = useResponsive();

	useKeyClick({
		key: 'Enter',
		onKeyDown: () => setDisplayBoxShadow(false),
		onKeyUp: () => {
			onClick({navigate});
			setDisplayBoxShadow(true);
		},
		disabled: disabled || disabledPrimaryButtonEnterClick || type !== 'primary',
		deps: [],
	});

	function gcn(...buttonClassName: Array<ClassValue>) {
		return cn(
			'block',
			disabled
				? 'cursor-not-allowed'
				: cn(
						'active:brightness-90 duration-300 transition ease-in-out cursor-pointer',
						isDesktop && 'hover:brightness-95',
				  ),
			...buttonClassName,
			className,
		);
	}

	const buttonProps = {
		onClick: disabled ? undefined : () => onClick({navigate}),
		disabled,
	};

	if (type === 'primary') {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'primaryButtonShadow block w-full rounded-3xl bg-primary-violet px-4 py-3 text-center text-white active:shadow-none',
					disabled && 'bg-primary-violet/20 shadow-none',
					isPending && 'cursor-not-allowed bg-primary-violet shadow-none',
					!displayBoxShadow && 'shadow-none',
				)}
			>
				{isPending ? (
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

	if (type === 'secondary') {
		if (isLoading) {
			return <PreloadSkeleton className='h-[40px] w-24 rounded-3xl' />;
		}

		return (
			<button
				{...buttonProps}
				className={gcn(
					'w-fit rounded-3xl bg-secondary-violet px-4 py-[10px] text-sm text-primary-violet hover:brightness-95',
					secondaryWithPrimaryStyles && 'w-full py-3 text-base',
					disabled && 'cursor-not-allowed bg-secondary-violet/20 text-white',
				)}
			>
				<div className='flex items-center justify-center gap-2'>
					{icon && <div>{styleElement(icon, 'size-[14px]')}</div>}
					{children && <div>{children}</div>}
				</div>
			</button>
		);
	}

	if (type === 'circle') {
		if (isLoading) {
			return (
				<div className='flex w-[68px] flex-col items-center gap-y-3'>
					<PreloadSkeleton isCircular className='size-11' />
					<PreloadSkeleton className='h-[12px] w-12' />
				</div>
			);
		}

		return (
			<button {...buttonProps} className={gcn('flex w-[68px] flex-col items-center active:scale-95')}>
				{icon && (
					<div
						className={cn(
							'flex size-11 items-center justify-center rounded-full bg-secondary-violet  text-primary-violet',
							disabled ? 'bg-secondary-violet/50 text-primary-violet/50' : 'bg-secondary-violet text-primary-violet',
						)}
					>
						{styleElement(icon, 'size-4')}
					</div>
				)}
				{children && (
					<div className={cn('mt-2 text-xs', disabled ? 'text-primary-violet/50' : 'text-primary-violet')}>
						{children}
					</div>
				)}
			</button>
		);
	}

	if (type === 'icon' && icon) {
		return (
			<button {...buttonProps} className={gcn('flex items-center justify-center')}>
				{icon}
			</button>
		);
	}

	if (type === 'text') {
		return (
			<button
				{...buttonProps}
				className={gcn(
					'w-fit text-sm font-medium text-primary-violet active:scale-95',
					icon && 'flex items-center gap-2',
				)}
			>
				{icon && styleElement(icon, 'size-3')}
				<span>{children}</span>
			</button>
		);
	}
}
