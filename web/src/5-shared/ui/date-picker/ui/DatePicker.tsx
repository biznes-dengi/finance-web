import {DateService} from '@shared/lib';
import {Box, Button, Popup, Icon, usePopupState} from '@shared/ui';
import {Calendar} from './Calendar.tsx';

type Props = {
	value: Date | undefined;
	onChange: (value: Date) => void;
};

export function DatePicker(props: Props) {
	const {value, onChange} = props;

	const {dialogRef, openDialog, closeDialog} = usePopupState();

	// TODO: когда меняем на новую дату ставится дефолтное время. Продумать логику.

	return (
		<>
			<Box>
				<Button icon={Icon.calendar} onClick={() => openDialog()}>
					{new DateService(value).getLocalDateString()}
				</Button>
			</Box>

			<Popup ref={dialogRef}>
				<div className='flex justify-center'>
					<Calendar
						mode='single'
						selected={value}
						onSelect={(date) => {
							if (!date) return;
							onChange(date);
							closeDialog();
						}}
					/>
				</div>
			</Popup>
		</>
	);
}
