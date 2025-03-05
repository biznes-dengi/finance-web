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

				<Content
					style={{maxWidth: '496px', margin: '0 auto'}}
					className='fixed bottom-0 left-0 right-0 max-h-[94vh] rounded-t-[28px] bg-light-grey outline-none transition-all duration-200'
				>
					<div className='mx-auto flex h-full w-full max-w-md flex-col p-2'>
						<div className='mx-auto mb-4 h-[3px] w-10 rounded-full bg-[#BAC3CA]' />
						<Title className={cn(title ? 'mb-4 text-center text-lg font-medium' : 'hidden')}>{title}</Title>
						{/* Контейнер для cкролла */}
						<div className='custom-scrollbar max-h-[84vh] flex-1 overflow-y-auto p-2 pt-0'>{children}</div>
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
