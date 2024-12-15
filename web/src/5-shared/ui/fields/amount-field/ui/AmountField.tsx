import {type AmountFieldBaseOption, type AmountFieldProps} from '../types/AmountField.types.ts';
import {AmountFieldHelpers} from '../lib/AmountField.helpers.ts';
import {Icon, Item, List, LoadingWrapper, Popup, usePopupState} from '@shared/ui';
import {cn, styleElement, useResponsive} from '@shared/lib';
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

	const {isDesktop} = useResponsive();

	const {popupProps, openPopup, closePopup} = usePopupState();

	function handleOptionSelect(option: Option) {
		setActiveOption!(option);
		onChange('');
		closePopup();
	}

	const description = AmountFieldHelpers.getDescription<Option>({getCustomDescription, activeOption});

	const isMultipleOptions = options?.length && options.length > 1 && setActiveOption;

	return (
		<>
			<label
				className={cn(
					'block cursor-pointer rounded-2xl bg-field p-4 duration-200 focus-within:bg-field-state',
					isDesktop && 'hover:bg-field-state',
					!!errorText && 'bg-[#FDE3E5]',
				)}
			>
				<div className='flex items-center justify-between'>
					<LoadingWrapper isLoading={!!isLoading} className='mb-1 h-6 w-20'>
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
						<LoadingWrapper isLoading={!!isLoading} className='mb-1 h-6 w-20'>
							<input
								type='text'
								inputMode='decimal'
								className={cn(
									'min-w-[1ch] bg-inherit text-right text-xl font-semibold caret-primary-violet outline-none',
									!!errorText && 'caret-[#B51F2D]',
								)}
								value={AmountFieldHelpers.getValue(value, withMinus, withPlus)}
								onChange={(event) => {
									onChange(event.target.value.replace(/[^0-9.]/g, '').trim());
								}}
								onKeyDown={(event) => {
									if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
										event.preventDefault();
									}
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

				<div className='mt-1.5 flex justify-between'>
					<LoadingWrapper isLoading={!!isLoading} className='mb-1 h-4 w-10'>
						<div
							className={cn(
								'mr-4 flex-shrink-0 basis-40 cursor-pointer text-sm font-light text-primary-grey',
								!!errorText && 'text-[#B51F2D]',
							)}
							onClick={() => !getCustomDescription && onChange(String(activeOption?.amount))}
						>
							{description}
						</div>
					</LoadingWrapper>

					{!!errorText && <div className='text-sm font-light text-[#B51F2D]'>{errorText}</div>}
				</div>
			</label>

			{isMultipleOptions && (
				<Popup {...popupProps}>
					<List
						rows={options}
						renderRow={(option) => (
							<Item
								className={cn(AmountFieldHelpers.isItemSelected<Option>(option, activeOption) && 'bg-light-grey')}
								onClick={() => handleOptionSelect(option)}
								image={option.image}
								statusIcon={AmountFieldHelpers.isItemSelected<Option>(option, activeOption) && <Icon type='check' />}
								name={option.name}
								description={description}
							/>
						)}
					/>
				</Popup>
			)}
		</>
	);
}
