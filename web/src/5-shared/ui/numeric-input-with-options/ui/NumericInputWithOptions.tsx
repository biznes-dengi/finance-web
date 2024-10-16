import {Dialog, Icon, Item, List, PRELOAD_SIZE, PreloadSkeleton, useDialogState} from '@shared/ui';
import {cn, isNumber, styleElement, textHelpers} from '@shared/lib';
import {TBaseOption, TNumericInputWithOptionsProps} from '../types/NumericInputWithOptions.types.ts';
import {CURRENCY_MAP} from '@shared/constants';

export function NumericInputWithOptions<Option extends TBaseOption>(props: TNumericInputWithOptionsProps<Option>) {
	const {value, onChange, options, getLabel, activeOption, setActiveOption, errorText} = props;

	const {dialogRef, openDialog, closeDialog} = useDialogState();

	function handleChange(value: string) {
		onChange(value ? Number(value) : undefined);
	}

	function getOptionLabel(option: Option) {
		if (getLabel) return getLabel(option);
		return textHelpers.getBalance(option.balance.amount, CURRENCY_MAP[option.balance.currency].symbol);
	}

	const isMultipleOptions = options?.length && options.length > 1;

	if (!activeOption) {
		return (
			<div className='rounded-2xl bg-input-grey p-4'>
				<PreloadSkeleton width={PRELOAD_SIZE.width.xl} height={PRELOAD_SIZE.height.xl} />
				<div className='mt-[10.8px]'>
					<PreloadSkeleton width={PRELOAD_SIZE.width.l} />
				</div>
			</div>
		);
	}

	return (
		<>
			<label className={cn('block rounded-2xl bg-input-grey p-4', !!errorText && 'bg-[#FDE3E5]')}>
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

					<input
						type='number'
						className={cn(
							'w-full bg-inherit text-right text-xl font-semibold caret-primary-violet outline-0',
							!!errorText && 'caret-[#B51F2D]',
						)}
						value={value ?? ''}
						onChange={(event) => handleChange(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
								event.preventDefault();
							}
						}}
						placeholder={String(0)}
					/>

					<div className={cn('ml-2 text-xl font-semibold', !isNumber(value) && 'text-[#9CA3AF]')}>
						{CURRENCY_MAP[activeOption.balance.currency].symbol}
					</div>
				</div>

				<div className='mt-1.5 flex justify-between'>
					<div
						className={cn(
							'mr-4 flex-shrink-0 basis-40 text-sm font-light text-primary-grey',
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
			</Dialog>
		</>
	);
}
