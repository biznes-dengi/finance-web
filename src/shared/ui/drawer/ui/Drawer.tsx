import {MutableRefObject, ReactNode, useEffect, useRef} from 'react';
import {Drawer as VaulDrawer} from 'vaul';

import {type useDrawerProps} from '@shared/ui';

const {Root, Trigger, Close, Overlay, Content, Portal} = VaulDrawer;

export type DrawerWrapperProps = {
	children: ReactNode;
	afterAutoCloseAction?: () => void;
	isCloseDisabled?: boolean;
	withOverlay?: boolean;
};

type DrawerProps = {
	openDrawerRef: MutableRefObject<() => void>;
	closeDrawerRef: MutableRefObject<() => void>;
} & DrawerWrapperProps &
	useDrawerProps;

export function Drawer(props: DrawerProps) {
	const {
		openDrawerRef,
		closeDrawerRef,
		children,
		afterAutoCloseAction,
		isCloseDisabled,
		direction,
		withOverlay = true,
	} = props;

	const withAutoClose = !!afterAutoCloseAction;

	const openButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	function openDrawer() {
		openButtonRef.current && openButtonRef.current.click();

		if (withAutoClose) {
			setTimeout(closeDrawer, 2000);
			setTimeout(afterAutoCloseAction, 2500);
		}
	}
	function closeDrawer() {
		closeButtonRef.current && closeButtonRef.current.click();
	}

	useEffect(() => {
		// Not in render to assign to ref only one time, even when component rerenders
		openDrawerRef.current = openDrawer;
		closeDrawerRef.current = closeDrawer;
	}, []);

	return (
		<Root dismissible={!isCloseDisabled} direction={direction}>
			<Trigger ref={openButtonRef} />
			<Close ref={closeButtonRef} />
			<Portal>
				{withOverlay && <Overlay className='fixed inset-0 bg-black/40' />}
				<Content className='fixed bottom-0 left-0 right-0 flex max-h-[96%] flex-col rounded-t-2xl bg-white transition-all duration-500'>
					<div className='mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4'>
						{withAutoClose ? (
							<div className='text-center'>animated progress</div>
						) : (
							<div className='mx-auto mb-6 h-1.5 w-12 rounded-full bg-zinc-300' />
						)}

						{children}
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
