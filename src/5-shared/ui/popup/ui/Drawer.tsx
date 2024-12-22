import {Drawer as VaulDrawer} from 'vaul';
import {DrawerProps} from '../types/Popup.types.ts';
import {cn} from '@shared/lib';

const {Root, Trigger, Close, Overlay, Content, Portal, Title} = VaulDrawer;

export function Drawer(props: DrawerProps) {
	const {title, children, isOpen, setIsOpen, handleClose} = props;

	return (
		<Root
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open);
				if (!open) handleClose?.();
			}}
		>
			<Trigger asChild>
				<button onClick={() => setIsOpen(true)} className='hidden' />
			</Trigger>
			<Close asChild>
				<button onClick={() => setIsOpen(false)} className='hidden' />
			</Close>

			<Portal>
				<Overlay className='fixed inset-0 bg-black/40' />

				<Content className='fixed bottom-0 left-0 right-0 rounded-t-3xl bg-light-grey outline-none transition-all duration-200'>
					<div className='mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-2xl p-4 pt-2'>
						<div className='mx-auto mb-4 h-1 w-12 rounded-full bg-[#BAC3CA]' />

						<Title className={cn(title ? 'mb-4 text-center text-xl font-medium' : 'hidden')}>{title}</Title>

						{children}
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
