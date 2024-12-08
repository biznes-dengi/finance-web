import {AppIcon, Popup, Icon, Item, List, PRELOAD_SIZE, PreloadSkeleton, usePopupState} from '@shared/ui';
import {cn, isNumber, styleElement, textHelpers} from '@shared/lib';
import {TBaseOption, TNumericInputWithOptionsProps} from '../types/NumericInputWithOptions.types.ts';
import {CURRENCY_MAP} from '@shared/constants';

export function NumericInputWithOptions<Option extends TBaseOption>(props: TNumericInputWithOptionsProps<Option>) {
	const {
		value,
		onChange,
		options,
		getLabel,
		activeOption,
		setActiveOption,
		errorText,
		withMinus,
		withPlus,
		isAutoFocusDisabled,
	} = props;

	const {dialogRef, openDialog, closeDialog} = usePopupState();

	function handleChange(value: string) {
		//TODO: на клаве decimal сюда залетает запятая
		/** 123. превращает в 123 */
		onChange(value ? Number(value) : undefined);
	}

	function getOptionLabel(option: Option) {
		if (getLabel) return getLabel(option);
		return textHelpers.getBalance(option.balance.amount ?? 0, CURRENCY_MAP[option.balance.currency].symbol);
	}

	const isMultipleOptions = options?.length && options.length > 1 && setActiveOption;

	if (!activeOption) {
		return (
			<div className='bg-input-grey rounded-2xl p-4'>
				<PreloadSkeleton width={PRELOAD_SIZE.width.xl} height={PRELOAD_SIZE.height.xl} />
				<div className='mt-[10.8px]'>
					<PreloadSkeleton width={PRELOAD_SIZE.width.l} />
				</div>
			</div>
		);
	}

	const getValue = () => {
		if (withMinus && isNumber(value)) {
			return `- ${value}`;
		}

		if (withPlus && isNumber(value)) {
			return `+ ${value}`;
		}

		return value ?? '';
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

	return (
		<>
			<label className={cn('block rounded-2xl p-4', !!errorText && 'bg-[#FDE3E5]')}>
				<div className='flex items-center justify-between'>
					<div
						className={cn('mr-4 flex min-w-40 items-center gap-2', isMultipleOptions && 'cursor-pointer')}
						onClick={openDialog}
					>
						{activeOption.image &&
							styleElement(activeOption.image, 'h-5 w-5 flex-shrink-0 rounded-full bg-primary-grey')}
						<div className='truncate text-xl'>{activeOption.name}</div>
						{isMultipleOptions && <div className='size-4 flex-shrink-0 text-black'>{Icon.chevronDown}</div>}
					</div>

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
								handleChange(event.target.value.replace(/[^0-9.]/g, '').trim());
							}}
							onKeyDown={(event) => {
								if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
									event.preventDefault();
								}
							}}
							placeholder={getPlaceholder()}
							autoFocus={!isAutoFocusDisabled}
						/>

						<div className={cn('ml-2 text-xl font-semibold', !isNumber(value) && 'text-[#9CA3AF]')}>
							{CURRENCY_MAP[activeOption.balance.currency].symbol}
						</div>
					</div>
				</div>

				<div className='mt-1.5 flex justify-between'>
					<div
						className={cn(
							'mr-4 flex-shrink-0 basis-40 cursor-pointer text-sm font-light text-primary-grey',
							!!errorText && 'text-[#B51F2D]',
						)}
						onClick={() => {
							!getLabel && handleChange(String(activeOption.balance.amount));
						}}
					>
						{getOptionLabel(activeOption)}
					</div>
					{!!errorText && <div className='text-sm font-light text-[#B51F2D]'>{errorText}</div>}
				</div>
			</label>

			{isMultipleOptions && (
				<Popup ref={dialogRef}>
					<List
						rows={options}
						renderRow={(option) => {
							const selected = option.id === activeOption.id;
							return (
								<Item
									statusIcon={selected && <AppIcon type='check' />}
									className={cn(selected && 'bg-light-grey')}
									image={option.image}
									name={option.name}
									description={getOptionLabel(option)}
									onClick={() => {
										setActiveOption(option);
										handleChange('');
										closeDialog();
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
