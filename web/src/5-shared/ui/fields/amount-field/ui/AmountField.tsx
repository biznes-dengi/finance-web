import {type AmountFieldBaseOption, type AmountFieldProps} from '../types/AmountField.types.ts';
import {Icon, Item, List, LoadingWrapper, Popup, usePopupState} from '@shared/ui';
import {cn, isNumber, styleElement, TextHelpers} from '@shared/lib';
import {CURRENCY_SYMBOL} from '@shared/constants';

export function AmountField<Option extends AmountFieldBaseOption>(props: AmountFieldProps<Option>) {
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

	const {popupProps, openPopup, closePopup} = usePopupState();

	const getValue = () => {
		if (!value) return '';

		const amountValue = TextHelpers.getAmount(value);

		if (withMinus) {
			return `- ${amountValue}`;
		}

		if (withPlus) {
			return `+ ${amountValue}`;
		}

		return amountValue;
	};
	const getPlaceholder = () => {
		if (withMinus) {
			return '- 0';
		}
		if (withPlus) {
			return '+ 0';
		}
		return '0';
	};

	const isMultipleOptions = options?.length && options.length > 1 && setActiveOption;

	const description = !getCustomDescription
		? activeOption &&
		  isNumber(activeOption.amount) &&
		  TextHelpers.getBalance(activeOption.amount, activeOption.currency)
		: activeOption && getCustomDescription(activeOption);

	return (
		<>
			<label className={cn('block rounded-2xl bg-field p-4', !!errorText && 'bg-[#FDE3E5]')}>
				<div className='flex items-center justify-between'>
					<LoadingWrapper isLoading={!!isLoading} className='h-6 w-32'>
						<div
							className={cn('mr-4 flex min-w-40 items-center gap-2', isMultipleOptions && 'cursor-pointer')}
							onClick={openPopup}
						>
							{activeOption?.image &&
								styleElement(activeOption.image, 'size-5 flex-shrink-0 rounded-full bg-primary-grey')}
							<div className='truncate text-xl'>{activeOption?.name}</div>
							{isMultipleOptions && (
								<div className='size-4 flex-shrink-0 text-black'>
									<Icon type='selectChevron' />
								</div>
							)}
						</div>
					</LoadingWrapper>

					<div className='flex min-w-[1ch] flex-shrink'>
						<input
							type='text'
							inputMode='decimal'
							className={cn(
								'min-w-[1ch] bg-inherit text-right text-xl font-semibold caret-primary-violet outline-none',
								!!errorText && 'caret-[#B51F2D]',
							)}
							value={getValue()}
							onChange={(event) => {
								onChange(event.target.value.replace(/[^0-9.]/g, '').trim());
							}}
							onKeyDown={(event) => {
								if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
									event.preventDefault();
								}
							}}
							placeholder={getPlaceholder()}
							autoFocus={!isAutoFocusDisabled}
						/>

						{activeOption && (
							<div className={cn('ml-2 text-xl font-semibold', !value && 'text-[#9CA3AF]')}>
								{CURRENCY_SYMBOL[activeOption.currency]}
							</div>
						)}
					</div>
				</div>

				<div className='mt-1.5 flex justify-between'>
					{activeOption && (
						<div
							className={cn(
								'mr-4 flex-shrink-0 basis-40 cursor-pointer text-sm font-light text-primary-grey',
								!!errorText && 'text-[#B51F2D]',
							)}
							onClick={() => !getCustomDescription && onChange(String(activeOption.amount))}
						>
							{description}
						</div>
					)}
					{!!errorText && <div className='text-sm font-light text-[#B51F2D]'>{errorText}</div>}
				</div>
			</label>

			{isMultipleOptions && (
				<Popup {...popupProps}>
					<List
						rows={options}
						renderRow={(option) => {
							let selected;

							if (option.id && activeOption?.id) {
								selected = option.id === activeOption.id;
							} else {
								selected = option.name === activeOption?.name;
							}

							return (
								<Item
									statusIcon={selected && <Icon type='check' />}
									className={cn(selected && 'bg-light-grey')}
									image={option.image}
									name={option.name}
									description={description}
									onClick={() => {
										setActiveOption(option);
										onChange('');
										closePopup();
									}}
								/>
							);
						}}
					/>
				</Popup>
			)}
		</>
	);
}
