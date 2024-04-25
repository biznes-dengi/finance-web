import {useRef, useState} from 'react';

import {cn} from '@shared/lib';
import {APP_TEXT} from '@shared/config';

type Props = {
	value: number | undefined;
	onChange: (value: number | undefined) => void;
	placeholder?: string;
	currencyCode?: string;
	currencySymbol?: string;
	disabled?: boolean;
};

/**
 * make with spaces, when value is number
 * */

export function NumericField(props: Props) {
	const {value, onChange, placeholder, currencySymbol, disabled, currencyCode} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	const [isError, setIsError] = useState(false);

	function handleChange(value: string) {
		setIsError(false);
		onChange(value ? Number(value) : undefined);

		// const mappedValue = value.replace(/\s/g, '');
		// if ((isNumber(+mappedValue) && !Number.isNaN(+mappedValue)) || mappedValue.includes('e')) {
		// 	onChange(value ? Number(value) : undefined);
		// 	setIsError(false);
		// }
	}

	function focusInput() {
		inputRef.current?.focus();

		// const isMobile = true;
		// isMobile && inputRef.current?.setSelectionRange(value.length, value.length);
	}

	return (
		<div className={cn('rounded-2xl bg-secondary-grey p-4', isError && 'bg-[#FDE3E5]')} onClick={focusInput}>
			<div className='flex items-center justify-between'>
				<div className='mr-4 flex items-center'>
					<div className='mr-2 h-5 w-5 rounded-full bg-primary-grey' />
					<div className='text-xl'>{currencyCode}</div>
				</div>

				<input
					type='number'
					ref={inputRef}
					className={cn(
						'w-full bg-inherit text-right text-xl font-semibold caret-primary-violet outline-0',
						isError && 'caret-[#B51F2D]',
					)}
					value={value ?? ''}
					onChange={(event) => handleChange(event.target.value)}
					placeholder={String(placeholder || 0)}
					readOnly={disabled}

					// when mappedValue is string
					// value={textHelpers.getAmount(mappedValue.replace(/\s/g, ''))}
				/>

				<div className={cn('ml-2 text-xl font-semibold', !value && 'text-[#9CA3AF]')}>{currencySymbol}</div>
			</div>

			<div className='mt-1 flex justify-between'>
				<div className={cn('text-sm font-light text-primary-grey', isError && 'text-[#B51F2D]')}>{APP_TEXT.target}</div>
				{isError && <div className='text-sm font-light text-[#B51F2D]'>exceeds balance (with small letter)</div>}
			</div>
		</div>
	);
}
