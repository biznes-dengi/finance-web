import {useEffect} from 'react';
import {EditButtonFieldProps} from '../types/EditButtonField.types.ts';
import {AmountField, Button, DateField, Icon, Popup, SelectWithSearch, TextField, usePopupState} from '@shared/ui';
import {APP_TEXT, CURRENCY} from '@shared/constants';

export function EditButtonField<Value>(props: EditButtonFieldProps<Value>) {
	const {
		type,
		icon = 'edit',
		isPending,
		isSuccess,
		isError,
		isChanged,
		isRequired,
		activeOption,
		options,
		initialValue,
		value,
		onChange,
		handleUpdate,
		title,
		children,
		maxLength,

		isNotEdit,
		minDate,
	} = props;

	const {
		popupProps: {isOpen, setIsOpen},
		openPopup,
		closePopup,
	} = usePopupState();

	useEffect(() => {
		if (isSuccess || isError) {
			closePopup();
		}
	}, [isSuccess, isError]);

	return (
		<>
			<Button
				onClick={openPopup}
				icon={icon === 'add' ? <Icon type='fund' /> : <Icon type={icon} className='size-1' />}
			>
				{children}
			</Button>

			<Popup
				title={isNotEdit ? title : APP_TEXT.edit + ' ' + title.toLowerCase()}
				isOpen={isOpen}
				setIsOpen={(open) => {
					setIsOpen(open);

					if (!open && isChanged) {
						onChange(initialValue as Value);
					}
				}}
			>
				{type === 'text' && (
					<TextField
						value={value as string}
						onChange={(value) => onChange(value as Value)}
						placeholder={title}
						maxLength={maxLength}
					/>
				)}

				{type === 'amount' && activeOption && (
					<AmountField
						value={value as string}
						onChange={(value) => onChange(value as Value)}
						activeOption={activeOption}
					/>
				)}

				{type === 'date' && (
					<div className='flex w-full justify-center'>
						<DateField value={value as Date | null} onChange={(date) => onChange(date as Value)} minDate={minDate} />
					</div>
				)}

				{type === 'select' && (
					<SelectWithSearch
						options={options}
						onChange={(value) => onChange(value as Value)}
						value={value as CURRENCY}
					/>
				)}

				<Button
					className='mt-6'
					type='primary'
					onClick={isNotEdit ? closePopup : handleUpdate!}
					isPending={isPending}
					disabled={!isChanged || (isRequired && !value)}
				>
					{APP_TEXT.save}
				</Button>
			</Popup>
		</>
	);
}
