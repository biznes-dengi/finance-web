import {useEffect} from 'react';
import {DeleteItemProps} from '../types/DeleteItem.types.ts';
import {Button, Item, Popup, StatusPopup, usePopupState} from '@shared/ui';
import {cn} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

export function DeleteItem(props: DeleteItemProps) {
	const {
		confirmationTitle,
		entityName,
		isPending,
		handleDelete,
		isSuccess,
		isError,
		children,
		successStatusTextKey,
		errorStatusTextKey,
	} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	useEffect(() => {
		if (isSuccess || isError) {
			closePopup();
		}
	}, [isSuccess, isError]);

	return (
		<>
			<Item name={children} className={cn('text-sm text-red-500')} onClick={openPopup} isSingle />

			<Popup {...popupProps} title={confirmationTitle}>
				<div className='text-center'>{`${APP_TEXT.deleteGoalConfirmation} ${entityName.toLowerCase()}?`}</div>
				<div className='mt-6 flex gap-2'>
					<Button type='secondary' onClick={closePopup} secondaryWithPrimaryStyles>
						{APP_TEXT.cancel}
					</Button>
					<Button type='primary' onClick={handleDelete} isPending={isPending}>
						{APP_TEXT.confirm}
					</Button>
				</div>
			</Popup>

			<StatusPopup isOpen={isSuccess} status='success' statusTextKey={successStatusTextKey} />
			<StatusPopup isOpen={isError} status='error' statusTextKey={errorStatusTextKey} />
		</>
	);
}
