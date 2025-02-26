import {MouseEvent, useEffect, useRef, useState} from 'react';
import {TextFieldProps} from '../props/TextField.types.ts';
import {cn, useResponsive} from '@shared/lib';
import {Icon} from '@shared/ui';

// SearchField
//  более высокоуровневый компонент, вынести отдельно
//  when isSearch and focused, pin search-input to the top with animation + cancel text at right

export function TextField(props: TextFieldProps) {
	const {
		value,
		onChange,
		placeholder,
		maxLength,
		isSearch,
		type = 'text',
		description,
		errorText,
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
					!!errorText && '!bg-secondary-error-red',
					isSearch && 'rounded-3xl px-3 py-1',
				)}
				onClick={focusInput}
			>
				{isSearch && <Icon type='search' className='mr-2 size-4 text-primary-grey' />}

				<input
					ref={inputRef}
					className={cn(
						'w-full bg-inherit  font-light caret-primary-violet outline-none',
						!!errorText && 'caret-error-red',
						isSearch && 'py-1 text-sm',
					)}
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
						className='ml-2 flex size-5 shrink-0 transform cursor-pointer items-center justify-center rounded-full bg-field-helper transition duration-300 ease-in-out active:scale-95 active:brightness-95'
						onClick={() => onChange('')}
					>
						<Icon
							type='x'
							className={cn(
								'size-3.5 text-field duration-300 ease-in-out group-focus-within:text-secondary-grey',
								isDesktop && 'group-hover:text-secondary-grey',
							)}
						/>
					</div>
				)}

				{value && type === 'password' && (
					<div
						ref={showHidePasswordIconRef}
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
						className='ml-2 transform cursor-pointer text-field-helper transition duration-300 ease-in-out active:scale-95 active:brightness-95'
					>
						<Icon type={isPasswordVisible ? 'hide' : 'show'} className={isPasswordVisible ? 'size-[21px]' : 'size-5'} />
					</div>
				)}
			</div>

			{(description || maxLength) && (
				<div className='flex cursor-default px-4 py-1 text-xs font-light text-field-helper'>
					{description && <div>{description}</div>}
					{errorText && <div className='text-error-red'>{errorText}</div>}
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
