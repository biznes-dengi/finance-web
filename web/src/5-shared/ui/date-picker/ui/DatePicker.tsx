import {DateService} from '@shared/lib';
import {Box, Button, Popup, Icon, usePopupState, DateField} from '@shared/ui';

type Props = {
	value: Date | undefined;
	onChange: (value: Date) => void;
};

export function DatePicker(props: Props) {
	const {value, onChange} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	return (
		<>
			<Box>
				<Button icon={<Icon type='calendar' />} onClick={openPopup}>
					{new DateService(value).getLocalDateString()}
				</Button>
			</Box>

			<Popup {...popupProps}>
				<div className='flex justify-center'>
					<DateField
						value={value}
						onChange={(date) => {
							if (!date) return;
							onChange(date);
							closePopup();
						}}
					/>
				</div>
			</Popup>
		</>
	);
}
