import {forwardRef, useImperativeHandle, useRef} from 'react';
import {Drawer as VaulDrawer} from 'vaul';

import {Box} from '@shared/ui';
import {DrawerProps, DrawerRef} from '../types/Dialog.types.ts';

const {Root, Trigger, Close, Overlay, Content, Portal} = VaulDrawer;

export const Drawer = forwardRef<DrawerRef, DrawerProps>((props, ref) => {
	const {title, children, isCloseDisabled, withAutoClose} = props;

	const openButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	function openDrawer() {
		openButtonRef.current && openButtonRef.current.click();
	}
	function closeDrawer() {
		closeButtonRef.current && closeButtonRef.current.click();
	}

	useImperativeHandle(ref, () => ({
		openDrawer,
		closeDrawer,
	}));

	return (
		<Root dismissible={!isCloseDisabled}>
			<Trigger ref={openButtonRef} className='hidden' />
			<Close ref={closeButtonRef} className='hidden' />

			<Portal>
				<Overlay className='fixed inset-0 bg-black/40' />

				<Content className='fixed bottom-0 left-0 right-0 flex flex-col rounded-t-2xl bg-light-grey outline-none transition-all duration-300'>
					<div className='mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-2xl p-4 pt-2'>
						{withAutoClose ? (
							<div className='text-center'>animated progress</div>
						) : (
							<div className='mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-300' />
						)}

						<Box className='mb-4 flex w-full justify-center text-xl font-medium'>{title}</Box>

						{children}
					</div>
				</Content>
			</Portal>
		</Root>
	);
});
