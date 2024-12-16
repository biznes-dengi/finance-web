import {cn, DateService} from '@shared/lib';
import {Button, DateField, Icon, Popup, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

type Props = {
	type: 'transactionDate' | 'deadline';
	value: Date | undefined;
	onChange: (value: Date) => void;
};

export function DatePicker(props: Props) {
	const {type, value, onChange} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	return (
		<>
			<div className='flex w-full items-center justify-between px-4 text-sm '>
				<div className='font-medium text-primary-grey'>
					{cn(type === 'deadline' && APP_TEXT.deadline, type === 'transactionDate' && APP_TEXT.transactionDate)}
				</div>
				<div className='shrink-0'>
					<Button icon={<Icon type='edit' />} onClick={openPopup}>
						{value ? new DateService(value).getLocalDateString() : APP_TEXT.noDate}
					</Button>
				</div>
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
