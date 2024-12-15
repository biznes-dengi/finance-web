import {DateService} from '@shared/lib';
import {Button, DateField, Icon, Popup, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

type Props = {
	value: Date | undefined;
	onChange: (value: Date) => void;
};

export function DatePicker(props: Props) {
	const {value, onChange} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	return (
		<>
			<div className='shrink-0'>
				<Button icon={<Icon type='edit' />} onClick={openPopup}>
					{value ? new DateService(value).getLocalDateString() : APP_TEXT.noDeadline}
				</Button>
			</div>

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
