import {cn} from '@shared/lib';
import {AppIcon, Icon} from '@shared/ui/Icon.tsx';
import {useRef, useState} from 'react';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	isSearch?: boolean;
	isAutoFocus?: boolean;
	type?: 'email' | 'text' | 'password';
};

/**
 * when isSearch and focused, pin search-input to the top with animation + cancel text at right
 */

export function TextField(props: Props) {
	const {value, onChange, placeholder, maxLength, isSearch, isAutoFocus, type = 'text'} = props;

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	function handleChange(value: string) {
		if (maxLength && value.length > maxLength) return;
		onChange(value);
	}

	return (
		<>
			<label
				className={cn(
					'group flex items-center rounded-2xl bg-field p-4 transition-colors duration-300 ease-in-out focus-within:bg-field-state hover:bg-field-state',
					isSearch && 'rounded-3xl p-1',
				)}
			>
				{isSearch && <div className='mx-1 h-4 w-4 text-primary-grey'>{Icon.search}</div>}

				<input
					type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
					value={value}
					onChange={(event) => handleChange(event.target.value)}
					placeholder={placeholder}
					autoFocus={isAutoFocus}
					ref={inputRef}
					className={cn('w-full bg-inherit font-light caret-primary-violet outline-0')}
				/>

				{value && type !== 'password' && (
					<div className='ml-2 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary-grey'>
						<AppIcon
							type='x'
							className={cn(
								'size-3.5 text-field duration-300 ease-in-out group-focus-within:text-secondary-grey group-hover:text-secondary-grey',
							)}
							onClick={() => onChange('')}
						/>
					</div>
				)}

				{value && type === 'password' && (
					<AppIcon
						type={isPasswordVisible ? 'hidePassword' : 'showPassword'}
						className='ml-2 size-5 cursor-pointer text-primary-grey'
						onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					/>
				)}
			</label>

			{maxLength && (
				<div className={cn('flex cursor-default justify-end pr-4 pt-1 text-sm text-primary-grey')}>
					{value.length} / {maxLength}
				</div>
			)}
		</>
	);
}
