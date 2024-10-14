import {useRef, useState} from 'react';
import {Dialog, Icon, Item, List} from '@shared/ui';
import {cn, isNumber, styleElement, useDialogState} from '@shared/lib';
import {TNumericInputWithOptionsProps, TBaseOption} from '../types/NumericInputWithOptions.types.ts';
import {CURRENCY_MAP} from '@shared/constants';

export function NumericInputWithOptions<Option extends TBaseOption>(props: TNumericInputWithOptionsProps<Option>) {
	const {value, onChange, placeholder, disabled, className, options: notMappedOptions, getLabel} = props;

	const options = notMappedOptions.map((option) => ({
		...option,
		image: <div className='h-10 w-10 rounded-full bg-primary-grey' />,
	}));

	const [activeOption, setActiveOption] = useState(options[0]);

	const inputRef = useRef<HTMLInputElement>(null);

	const [isError, setIsError] = useState(false);

	const {dialogRef, openDialog, closeDialog} = useDialogState();

	function handleChange(value: string) {
		setIsError(false);
		onChange(value ? Number(value) : undefined);
	}

	if (!options) return null;

	return (
		<>
			<label className={cn('block rounded-2xl bg-input-grey p-4', className, isError && 'bg-[#FDE3E5]')}>
				<div className='flex items-center justify-between'>
					<div className='mr-4 flex min-w-40 items-center' onClick={openDialog}>
						{activeOption.image && (
							<div className='mr-2'>{styleElement(activeOption.image, 'h-5 w-5 rounded-full bg-primary-grey')}</div>
						)}
						<div className='truncate text-xl'>{activeOption.name}</div>
						{options?.length && <div className='ml-2 h-4 w-4 flex-shrink-0 text-black'>{Icon.chevronDown}</div>}
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
					/>

					<div className={cn('ml-2 text-xl font-semibold', !isNumber(value) && 'text-[#9CA3AF]')}>
						{CURRENCY_MAP[activeOption.balance.currency].symbol}
					</div>
				</div>

				<div className='mt-1 flex justify-between'>
					<div className={cn('text-sm font-light text-primary-grey', isError && 'text-[#B51F2D]')}>
						{getLabel(activeOption)}
					</div>
					{isError && <div className='text-sm font-light text-[#B51F2D]'>exceeds balance (with small letter)</div>}
				</div>
			</label>

			{options && (
				<Dialog ref={dialogRef}>
					<List
						rows={options}
						renderRow={(option) => {
							const selected = option.id === activeOption.id;
							return (
								<Item
									statusIcon={selected && Icon.check}
									className={cn(selected && 'bg-light-grey')}
									image={option.image}
									name={option.name}
									description={getLabel(option)}
									onClick={() => {
										setActiveOption(option);
										closeDialog();
									}}
								/>
							);
						}}
					/>
				</Dialog>
			)}
		</>
	);
}

/**
 * make with spaces, when value is number
 * when first input value is 0, next value can be only "," or "."
 * can provide "e"
 * */

// When focus
// const isMobile = true;
// isMobile && inputRef.current?.setSelectionRange(value.length, value.length);

// when mappedValue is string
// <input value={textHelpers.getAmount(mappedValue.replace(/\s/g, ''))} />

// handleChange
// const mappedValue = value.replace(/\s/g, '');
// if ((isNumber(+mappedValue) && !Number.isNaN(+mappedValue)) || mappedValue.includes('e')) {
// 	onChange(value ? Number(value) : undefined);
// 	setIsError(false);
// }
