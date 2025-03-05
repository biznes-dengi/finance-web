import {useEffect, useState} from 'react';
import {TextEditButtonProps} from '../types/TextEditButton.types.ts';
import {Button, Icon, LoadingWrapper, Popup, StatusPopup, TextField, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {useKeyClick, useResponsive} from '@shared/lib';

export function TextEditButton(props: TextEditButtonProps) {
	const {
		children,
		entityName,
		maxLength,
		initialValue,
		value,
		onChange,
		handleUpdate,
		isLoading,
		isChanged,
		isPending,
		isSuccess,
		isError,
	} = props;

	const [isFocused, setIsFocused] = useState(false);

	const {isDesktop} = useResponsive();

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

	useKeyClick({
		key: 'Enter',
		onKeyUp: () => setIsFocused(false),
		disabled: isDesktop,
	});

	return (
		<>
			<LoadingWrapper isLoading={!!isLoading} className='my-0.5 h-4 w-10'>
				<Button type='text' onClick={openPopup} icon={<Icon type='edit' className='size-1' />}>
					{children}
				</Button>
			</LoadingWrapper>

			<Popup
				title={APP_TEXT.edit + ' ' + entityName.toLowerCase()}
				isOpen={isOpen}
				setIsOpen={(open) => {
					setIsOpen(open);

					if (!open && isChanged) {
						onChange(initialValue);
					}
				}}
			>
				<TextField
					value={value}
					onChange={onChange}
					placeholder={entityName}
					maxLength={maxLength}
					isFocused={isFocused}
					setIsFocused={setIsFocused}
					enterKeyHint='done'
				/>

				<Button
					className='mt-6'
					type='primary'
					onClick={handleUpdate}
					isPending={isPending}
					disabled={!isChanged || !value}
					disabledPrimaryButtonEnterClick={!isDesktop}
				>
					{APP_TEXT.save}
				</Button>
			</Popup>

			<StatusPopup isOpen={isSuccess} status='success' statusTextKey='updateWalletSuccess' />
			<StatusPopup isOpen={isError} status='error' statusTextKey='updateWalletError' />
		</>
	);
}
