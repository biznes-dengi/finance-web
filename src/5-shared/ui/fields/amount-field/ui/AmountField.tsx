import {ChangeEvent, MouseEvent, useRef} from 'react';
import {type AmountFieldOption, type AmountFieldProps} from '../types/AmountField.types.ts';
import {AmountFieldHelpers} from '../lib/AmountField.helpers.ts';
import {Icon, Item, List, LoadingWrapper, Popup, usePopupState} from '@shared/ui';
import {cn, styleElement, useResponsive} from '@shared/lib';
import {CURRENCY_SYMBOL} from '@shared/constants';

export function AmountField<Option extends AmountFieldOption>(props: AmountFieldProps<Option>) {
	const {
		value,
		onChange,
		activeOption,
		isLoading,
		getCustomDescription,
		options,
		setActiveOption,
		errorText,
		withMinus,
		withPlus,
		isAutoFocusDisabled,
	} = props;

	const {isDesktop} = useResponsive();

	const {popupProps, openPopup, closePopup} = usePopupState();

	const inputRef = useRef<HTMLInputElement>(null);
	const optionsRef = useRef<HTMLDivElement>(null);

	function handleOptionSelect(option: Option) {
		setActiveOption!(option);
		onChange('');
		closePopup();
	}
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const value = event.target.value.trim().replace(',', '.');

		// Если в значении уже есть точка, запрещаем вводить еще точку
		if (value.includes('.') && value.endsWith('.') && value.split('.').length > 2) {
			return;
		}

		// Если в значении уже есть точка, запрещаем вводить запятую
		if (value.includes('.') && value.endsWith(',')) {
			return;
		}

		// Если в значении 2 цифры после точки, запрещаем вводить еще цифры
		if (value.includes('.') && value.split('.')[1].length > 2) {
			return;
		}

		// Оставляем только цифры и точку
		onChange(value.replace(/[^0-9.]/g, ''));
	}

	function focusInput(event?: MouseEvent<HTMLDivElement>) {
		// Если был клик по options, то не фокусировать инпут
		if (optionsRef.current?.contains(event?.target as Node)) return;
		inputRef.current?.focus();
	}

	const isMultipleOptions = Number(options?.length) > 1 && setActiveOption;

	return (
		<>
			<div
				className={cn(
					'rounded-2xl bg-field p-4 duration-300 focus-within:bg-field-state',
					isDesktop && 'hover:bg-field-state',
					!!errorText && '!bg-[#FDE3E5]',
				)}
				onClick={focusInput}
			>
				<div className='flex items-center justify-between'>
					<LoadingWrapper isLoading={!!isLoading} className='mb-2 mt-1 h-4 w-20'>
						<div ref={optionsRef} className='mr-4 min-w-40'>
							<div
								className={cn(
									'flex w-fit items-center gap-1.5',
									isMultipleOptions ? 'cursor-pointer' : 'cursor-default',
								)}
								onClick={openPopup}
							>
								{activeOption?.image &&
									styleElement(activeOption.image, 'size-5 flex-shrink-0 rounded-full bg-primary-grey')}

								<div className='truncate font-medium'>{activeOption?.name}</div>

								{isMultipleOptions && <Icon type='selectChevron' className='size-3 flex-shrink-0' />}
							</div>
						</div>
					</LoadingWrapper>

					<div className='flex min-w-[1ch] flex-shrink'>
						<LoadingWrapper isLoading={!!isLoading} className='mb-2 mt-1 h-4 w-10'>
							<input
								type='text'
								inputMode='decimal'
								ref={inputRef}
								className={cn(
									'min-w-[1ch] bg-inherit text-right text-xl font-semibold caret-primary-violet outline-none',
									!!errorText && 'caret-[#B51F2D]',
								)}
								value={AmountFieldHelpers.getValue(value, withMinus, withPlus)}
								onChange={handleChange}
								onKeyDown={(event) => {
									if (event.key === 'ArrowUp' || event.key === 'ArrowDown') event.preventDefault();
								}}
								placeholder={AmountFieldHelpers.getPlaceholder(withMinus, withPlus)}
								autoFocus={!isAutoFocusDisabled}
							/>

							{activeOption && (
								<div className={cn('ml-2 text-xl font-semibold', !value && 'text-[#9CA3AF]')}>
									{CURRENCY_SYMBOL[activeOption.currency]}
								</div>
							)}
						</LoadingWrapper>
					</div>
				</div>

				<div className='mt-1 flex justify-between'>
					<LoadingWrapper isLoading={!!isLoading} className='mb-1 h-4 w-10'>
						<div
							className={cn(
								'mr-4 min-w-40',
								!getCustomDescription && 'cursor-pointer',
								!!errorText && 'text-[#B51F2D]',
							)}
							onClick={() => !getCustomDescription && onChange(String(activeOption?.amount))}
						>
							<div className='truncate text-sm font-light text-primary-grey'>
								{AmountFieldHelpers.getDescription<Option>({
									getCustomDescription,
									option: activeOption,
								})}
							</div>
						</div>
					</LoadingWrapper>

					{!!errorText && <div className='text-sm font-light text-[#B51F2D]'>{errorText}</div>}
				</div>
			</div>

			{isMultipleOptions && (
				<Popup {...popupProps}>
					<List
						items={options ? options : null}
						renderItem={(option) => (
							<Item
								className={cn(AmountFieldHelpers.isItemSelected<Option>(option, activeOption) && 'bg-light-grey')}
								onClick={() => handleOptionSelect(option)}
								image={option.image}
								name={option.name}
								description={AmountFieldHelpers.getDescription<Option>({getCustomDescription, option})}
								rightNode={
									AmountFieldHelpers.isItemSelected<Option>(option, activeOption) && (
										<Icon type='check' className='flex size-4 self-center text-primary-violet' />
									)
								}
							/>
						)}
					/>
				</Popup>
			)}
		</>
	);
}
