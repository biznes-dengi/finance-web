import {useEffect, useState} from 'react';

export function usePopupState({initialState = false}: {initialState?: boolean} = {}) {
	const [isOpen, setIsOpen] = useState(initialState);

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	function handleOpen() {
		setIsOpen(true);
	}
	function handleClose() {
		setIsOpen(false);
	}

	return {
		popupProps: {isOpen, setIsOpen},
		openPopup: handleOpen,
		closePopup: handleClose,
	};
}
