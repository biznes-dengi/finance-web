import {cn} from '@shared/lib';
import {AppIcon, Icon} from '@shared/ui/Icon.tsx';
import {MouseEvent, useRef, useState} from 'react';
import {buttonClickStyles} from '@shared/ui/button/ui/Button.tsx';

type Props = {
	type?: 'email' | 'text' | 'password';
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	label?: string;
	maxLength?: number;

	isSearch?: boolean;
};

// TODO: SearchField
//  более высокоуровневый компонент, вынести отдельно
//  when isSearch and focused, pin search-input to the top with animation + cancel text at right

export function TextField(props: Props) {
	const {value, onChange, placeholder, maxLength, isSearch, type = 'text', label} = props;

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const iconRef = useRef<HTMLDivElement>(null);

	function focusInput(event?: MouseEvent<HTMLDivElement>) {
		if (!inputRef.current) return;

		// Проверяем, был ли клик по иконке show / hide password
		if (iconRef.current && iconRef.current.contains(event?.target as Node)) return;

		inputRef.current.focus();
	}

	function blurInput() {
		if (!inputRef.current) return;
		inputRef.current.blur();
	}

	function handleChange(value: string) {
		if (maxLength && value.length > maxLength) return;
		onChange(value);
	}

	function handlePasswordToggle() {
		blurInput();
		setIsPasswordVisible(!isPasswordVisible);
	}

	function handleClear() {
		focusInput();
		onChange('');
	}

	return (
		<div role='text-field'>
			<div
				className={cn(
					'group flex cursor-text items-center rounded-2xl bg-field p-4 transition-colors duration-300 ease-in-out focus-within:bg-field-state hover:bg-field-state',
					isSearch && 'rounded-3xl p-1',
				)}
				onClick={focusInput}
			>
				{isSearch && <div className='mx-1 h-4 w-4 text-primary-grey'>{Icon.search}</div>}

				<input
					type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
					value={value}
					onChange={(event) => handleChange(event.target.value)}
					placeholder={placeholder}
					ref={inputRef}
					className={cn('w-full bg-inherit font-light caret-primary-violet outline-none')}
				/>

				{value && type !== 'password' && (
					<div
						className={cn(
							'ml-2 flex size-5 shrink-0 transform cursor-pointer items-center justify-center rounded-full bg-field-helper',
							buttonClickStyles,
						)}
					>
						<AppIcon
							type='x'
							className={cn(
								'size-3.5 text-field duration-300 ease-in-out group-focus-within:text-secondary-grey group-hover:text-secondary-grey',
							)}
							onClick={handleClear}
						/>
					</div>
				)}

				{value && type === 'password' && (
					<div
						ref={iconRef}
						onClick={handlePasswordToggle}
						className={cn('ml-2 transform cursor-pointer text-field-helper', buttonClickStyles)}
					>
						<AppIcon type={isPasswordVisible ? 'hidePassword' : 'showPassword'} className='size-5' />
					</div>
				)}
			</div>

			{(label || maxLength) && (
				<div className='flex cursor-default px-4 py-1 text-xs font-light text-field-helper'>
					{label && <div>{label}</div>}
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
