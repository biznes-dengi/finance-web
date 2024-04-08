import {cn} from '@shared/lib';
import {APP_ICON} from '@shared/ui/Icon.tsx';
import {useRef} from 'react';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	isSearch?: boolean;
};

/**
 * when isSearch and focused, input to the top with animation
 */

export function TextField(props: Props) {
	const {value, onChange, placeholder, maxLength, isSearch} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	function handleChange(value: string) {
		if (maxLength && value.length > maxLength) return;

		onChange(value);
	}

	function handleInputFocus() {
		inputRef.current && inputRef.current.focus();
	}

	return (
		<>
			<div
				className={cn('flex items-center rounded-3xl bg-secondary-grey px-4 py-3', isSearch && 'p-1')}
				onClick={handleInputFocus}
			>
				{isSearch && <div className='mx-1 h-4 w-4 text-primary-grey'>{APP_ICON.search}</div>}

				<input
					ref={inputRef}
					className={cn('w-full bg-inherit outline-0')}
					value={value}
					onChange={(event) => handleChange(event.target.value)}
					placeholder={placeholder}
					type='text'
				/>

				{value && (
					<div
						onClick={() => onChange('')}
						className={cn(
							'ml-2 h-4 w-4 cursor-pointer rounded-full bg-primary-grey p-1 text-secondary-grey',
							isSearch && 'mx-1',
						)}
					>
						{APP_ICON.reset}
					</div>
				)}
			</div>

			{maxLength && (
				<div className={cn('mb-2 mr-4 mt-1 flex cursor-default justify-end text-sm text-primary-grey')}>
					{value.length} / {maxLength}
				</div>
			)}
		</>
	);
}
