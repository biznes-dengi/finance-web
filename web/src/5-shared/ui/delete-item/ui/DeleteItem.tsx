import {useEffect, useState} from 'react';
import {DeleteItemProps} from '../types/DeleteItem.types.ts';
import {cn} from '@shared/lib';
import {Button, ButtonType, Item, Popup, StatusPopup, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

export function DeleteItem(props: DeleteItemProps) {
	const {title, confirmationText, isLoading, handleDelete, isSuccess, isError, children} = props;

	const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
	const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		if (isSuccess) {
			closePopup();
			setSuccessPopupOpen(true);
		}

		if (isError) {
			closePopup();
			setErrorPopupOpen(true);
		}
	}, [isSuccess, isError]);

	return (
		<>
			<Item name={children} className={cn('text-sm text-red-500')} onClick={openPopup} isSingle />

			<Popup {...popupProps} title={title}>
				<div className='text-center'>{confirmationText}</div>
				<div className='mt-6 flex gap-2'>
					<Button type={ButtonType.main} onClick={closePopup} isSecondary>
						{APP_TEXT.cancel}
					</Button>
					<Button type={ButtonType.main} onClick={handleDelete} isLoading={isLoading}>
						{APP_TEXT.confirm}
					</Button>
				</div>
			</Popup>

			<StatusPopup isOpen={isSuccessPopupOpen} status='success' statusTextKey='goalDeleteSuccess' />
			<StatusPopup isOpen={isErrorPopupOpen} status='error' statusTextKey='goalDeleteError' />
		</>
	);
}
