import {useEffect} from 'react';
import {AmountField, Button, ButtonType, Icon, Popup, SelectWithSearch, TextField, usePopupState} from '@shared/ui';
import {EditButtonFieldProps} from '../types/EditButtonField.types.ts';
import {Calendar} from '@shared/ui/date-picker/ui/Calendar.tsx';
import {APP_TEXT, CURRENCY} from '@shared/constants';

export function EditButtonField<Value>(props: EditButtonFieldProps<Value>) {
	const {type, isLoading, isSuccess, isError, isChanged, options, value, onChange, handleUpdate, fieldName, children} =
		props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		if (isSuccess || isError) {
			closePopup();
		}
	}, [isSuccess, isError]);

	return (
		<>
			<Button onClick={openPopup} icon={<Icon type='edit' className='size-1' />}>
				{children}
			</Button>

			<Popup {...popupProps}>
				<div className='mb-4 text-center text-xl font-medium'>{fieldName}</div>

				{type === 'text' && (
					<TextField value={value as string} onChange={(value) => onChange(value as Value)} placeholder={fieldName} />
				)}

				{/*{type === 'amount' && (*/}
				{/*	<NumericInput*/}
				{/*		value={isNull(value) ? undefined : (value as number)}*/}
				{/*		onChange={(value) => onChange(value as Value)}*/}
				{/*		placeholder={fieldName}*/}
				{/*	/>*/}
				{/*)}*/}

				{type === 'amount' && (
					<AmountField
						value={value as string}
						onChange={(value) => onChange(value as Value)}
						activeOption={{id: 1, name: 'GENA', balance: {amount: 10, currency: CURRENCY.USD}}}
					/>
				)}

				{type === 'date' && (
					<div className='flex w-full justify-center'>
						<Calendar mode='single' selected={value as Date | undefined} onSelect={(date) => onChange(date as Value)} />
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
					type={ButtonType.main}
					onClick={handleUpdate}
					isLoading={isLoading}
					disabled={!isChanged}
				>
					{APP_TEXT.update}
				</Button>
			</Popup>
		</>
	);
}
