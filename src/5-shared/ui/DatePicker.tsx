import {Button, DateField, Icon, Popup, usePopupState} from '@shared/ui/index.ts';
import {APP_TEXT} from '@shared/constants';
import {ReactNode, useState} from 'react';
import {DateService, isNull} from '@shared/lib';

type DatePickerProps = {
	value: Date | null;
	minDate?: Date;
	onChange: (value: Date | null) => void;
	children: ReactNode;
	title: ReactNode;
	withReset?: boolean;
};

export function DatePicker(props: DatePickerProps) {
	const {value, onChange, children, minDate, title, withReset} = props;

	const [localValue, setLocalValue] = useState(value);

	const {
		popupProps: {isOpen, setIsOpen},
		openPopup,
		closePopup,
	} = usePopupState();

	const isChanged = (() => {
		if (isNull(value) && isNull(localValue)) {
			return false;
		}

		if (isNull(value) && !isNull(localValue)) {
			return true;
		}

		if (!isNull(value) && isNull(localValue)) {
			return true;
		}

		if (!!value && !!localValue) {
			return !new DateService(localValue).isEqualTo(value);
		}
	})();

	return (
		<>
			<Button onClick={openPopup} icon={!value ? <Icon type='fund' /> : <Icon type='edit' className='size-1' />}>
				{children}
			</Button>

			<Popup
				isOpen={isOpen}
				setIsOpen={(open) => {
					setIsOpen(open);

					if (!open && isChanged) {
						setLocalValue(value);
					}
				}}
			>
				<div className='mb-4 text-center text-xl font-medium'>{title}</div>

				<div className='flex w-full justify-center'>
					<DateField value={localValue} onChange={setLocalValue} minDate={minDate} withReset={withReset} />
				</div>

				<Button
					className='mt-6'
					type='primary'
					onClick={() => {
						onChange(localValue);
						closePopup();
					}}
					disabled={!isChanged}
				>
					{APP_TEXT.save}
				</Button>
			</Popup>
		</>
	);
}
