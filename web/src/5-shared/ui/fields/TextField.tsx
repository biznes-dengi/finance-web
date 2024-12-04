import {MouseEvent, useEffect, useRef, useState} from 'react';
import {cn, useResponsive} from '@shared/lib';
import {Icon} from '@shared/ui/icon/ui/Icon.tsx';
import {buttonClickStyles} from '@shared/ui/button/ui/Button.tsx';

type Props = {
	type?: 'email' | 'text' | 'password';
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	enterKeyHint?: 'search' | 'enter' | 'done' | 'go' | 'next' | 'previous' | 'send';

	description?: string;
	maxLength?: number;
	isFocused?: boolean;
	setIsFocused?: (value: boolean) => void;

	isSearch?: boolean;
};

// TODO: SearchField
//  более высокоуровневый компонент, вынести отдельно
//  when isSearch and focused, pin search-input to the top with animation + cancel text at right

export function TextField(props: Props) {
	const {
		value,
		onChange,
		placeholder,
		maxLength,
		isSearch,
		type = 'text',
		description,
		enterKeyHint,
		isFocused,
		setIsFocused,
	} = props;

	const {isDesktop} = useResponsive();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const showHidePasswordIconRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isFocused && inputRef.current !== document.activeElement) {
			inputRef.current?.focus();
		}
		if (!isFocused) {
			inputRef.current?.blur();
		}
	}, [isFocused]);

	function focusInput(event?: MouseEvent<HTMLDivElement>) {
		// Проверяем, был ли клик по иконке show / hide password
		if (showHidePasswordIconRef.current?.contains(event?.target as Node)) return;
		inputRef.current?.focus();
		setIsFocused?.(true);
	}

	function handleChange(value: string) {
		if (maxLength && value.length > maxLength) return;
		onChange(value);
	}

	return (
		<div role='text-field'>
			<div
				className={cn(
					'group flex cursor-text items-center rounded-2xl bg-field p-4 transition-colors duration-300 ease-in-out focus-within:bg-field-state',
					isDesktop && 'hover:bg-field-state',
					isSearch && 'rounded-3xl p-1',
				)}
				onClick={focusInput}
			>
				{isSearch && <Icon type='search' className='mx-1 size-4 text-primary-grey' />}

				<input
					ref={inputRef}
					className='w-full bg-inherit font-light caret-primary-violet outline-none'
					type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
					inputMode={type === 'email' ? 'email' : 'text'}
					value={value}
					onChange={(event) => handleChange(event.target.value)}
					placeholder={placeholder}
					enterKeyHint={enterKeyHint}
					onFocus={() => setIsFocused?.(true)}
					onBlur={() => setIsFocused?.(false)}
				/>

				{value && type !== 'password' && (
					<div
						className={cn(
							'ml-2 flex size-5 shrink-0 transform cursor-pointer items-center justify-center rounded-full bg-field-helper',
							buttonClickStyles,
						)}
					>
						<Icon
							type='x'
							className={cn(
								'size-3.5 text-field duration-300 ease-in-out group-focus-within:text-secondary-grey',
								isDesktop && 'group-hover:text-secondary-grey',
							)}
							onClick={() => onChange('')}
						/>
					</div>
				)}

				{value && type === 'password' && (
					<div
						ref={showHidePasswordIconRef}
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
						className={cn('ml-2 transform cursor-pointer text-field-helper', buttonClickStyles)}
					>
						<Icon type={isPasswordVisible ? 'hidePassword' : 'showPassword'} className='size-5' />
					</div>
				)}
			</div>

			{(description || maxLength) && (
				<div className='flex cursor-default px-4 py-1 text-xs font-light text-field-helper'>
					{description && <div>{description}</div>}
					{maxLength && (
						<div className='ml-auto'>
							{value.length} / {maxLength}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
