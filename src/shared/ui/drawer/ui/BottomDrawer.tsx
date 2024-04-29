import {MutableRefObject, useEffect, useRef} from 'react';
import {Drawer} from 'vaul';

import type {DrawerProps} from '@shared/ui';

type BottomDrawer = {
	openDrawerRef: MutableRefObject<() => void>;
	closeDrawerRef: MutableRefObject<() => void>;
} & DrawerProps;

export function BottomDrawer(props: BottomDrawer) {
	const {openDrawerRef, closeDrawerRef, content, afterAutoCloseAction, isCloseDisabled} = props;

	const shouldAutoClose = !!afterAutoCloseAction;

	const openButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	function openDrawer() {
		openButtonRef.current && openButtonRef.current.click();

		if (shouldAutoClose) {
			setTimeout(closeDrawer, 2000);
			setTimeout(afterAutoCloseAction, 2500);
		}
	}
	function closeDrawer() {
		closeButtonRef.current && closeButtonRef.current.click();
	}

	useEffect(() => {
		// When parent rerenders BottomDrawer rerenders too, which will cause reassignment at every render, so here
		openDrawerRef.current = openDrawer;
		closeDrawerRef.current = closeDrawer;
	}, []);

	return (
		<Drawer.Root dismissible={!isCloseDisabled}>
			<Drawer.Trigger ref={openButtonRef} />
			<Drawer.Close ref={closeButtonRef} />
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40' />
				<Drawer.Content className='fixed bottom-0 left-0 right-0 flex max-h-[96%] flex-col rounded-t-[10px] bg-white'>
					<div className='mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4'>
						{shouldAutoClose ? (
							<div>animated progress</div>
						) : (
							<div className='mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-300' />
						)}

						{content}
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
