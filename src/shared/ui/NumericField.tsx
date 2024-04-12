import {cn, isNumber, textHelpers} from '@shared/lib';
import {useRef, useState} from 'react';
import {APP_TEXT} from '@shared/config';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	currencyCode?: string;
	currencySymbol?: string;
	disabled?: boolean;
};

const isMobile = true;

export function NumericField(props: Props) {
	const {value, onChange, placeholder, currencySymbol, disabled, currencyCode} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	const [isError, setIsError] = useState(false);

	function handleChange(value: string) {
		const mappedValue = value.replace(/\s/g, '');

		if ((isNumber(+mappedValue) && !Number.isNaN(+mappedValue)) || mappedValue.includes('e')) {
			onChange(value);
			setIsError(false);
		}
	}

	function focusInput() {
		inputRef.current?.focus();
		isMobile && inputRef.current?.setSelectionRange(value.length, value.length);
	}

	const showPlaceholder = !value;

	return (
		<div className='rounded-2xl bg-secondary-grey p-4' onClick={focusInput}>
			<div className='flex items-center justify-between'>
				<div className='mr-4 flex items-center'>
					<div className='mr-2 h-5 w-5 rounded-full bg-primary-grey' />
					<div className='text-xl'>{currencyCode}</div>
				</div>

				<input
					ref={inputRef}
					className={cn(
						'w-full bg-inherit text-right text-xl font-semibold caret-primary-violet outline-0',
						isError && 'caret-red-600',
					)}
					value={textHelpers.getAmount(value.replace(/\s/g, ''))}
					onChange={(event) => handleChange(event.target.value)}
					placeholder={`${placeholder || 0}`}
					readOnly={disabled}
				/>

				<div className={cn('ml-2 text-xl font-semibold', showPlaceholder && 'text-[#9CA3AF]')}>{currencySymbol}</div>
			</div>

			<div className='mt-1 flex justify-between'>
				<div className='text-sm font-light text-primary-grey'>{APP_TEXT.targetAmount}</div>
				{isError && <div className='text-sm font-light text-red-600'>exceeds balance (with small letter)</div>}
			</div>
		</div>
	);
}
