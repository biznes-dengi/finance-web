import {Drawer as VaulDrawer} from 'vaul';
import {useEffect, useRef, useState} from 'react';
import {statusDuration} from '../lib/StatusPopup.lib.ts';
import {StatusDialogProps} from '../types/StatusPopup.types.ts';
import {Icon, STATUS_POPUP_TEXT} from '@shared/ui';
import {cn} from '@shared/lib';

const {Root, Trigger, Close, Overlay, Content, Portal} = VaulDrawer;

export function StatusPopup(props: StatusDialogProps) {
	const {isOpen, status, statusTextKey} = props;

	const [progress, setProgress] = useState(0);

	const openButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		openDrawer();
	}, [isOpen]);
	useEffect(() => {
		let animationFrameId: number;
		const start = performance.now();

		const animate = (time: number) => {
			const elapsed = time - start;
			const percentage = Math.min((elapsed / statusDuration) * 100, 100);
			setProgress(percentage);

			if (elapsed < statusDuration) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		animationFrameId = requestAnimationFrame(animate);
		const timeoutId = setTimeout(closeDrawer, statusDuration);

		return () => {
			cancelAnimationFrame(animationFrameId);
			clearTimeout(timeoutId);
		};
	}, [isOpen]);

	function openDrawer() {
		openButtonRef.current?.click();
	}
	function closeDrawer() {
		closeButtonRef.current?.click();
	}

	return (
		<Root dismissible={false}>
			<Trigger ref={openButtonRef} className='hidden' />
			<Close ref={closeButtonRef} className='hidden' />

			<Portal>
				<Overlay className='fixed inset-0 bg-black/40' />

				<Content className='fixed bottom-0 left-0 right-0 rounded-t-3xl bg-light-grey outline-none transition-all duration-200'>
					<div
						className={cn(
							'mx-auto flex w-full max-w-md flex-col overflow-auto p-4 pt-2 text-center',
							isOpen && 'items-center',
						)}
					>
						<div className='mx-auto mb-4 h-1.5 w-12 rounded-full bg-secondary-grey'>
							<div className='h-full rounded-full bg-[#BAC3CA]' style={{width: `${progress}%`}} />
						</div>

						<Icon
							type={status}
							className={cn(
								'mb-4 mt-2 size-10',
								status === 'success' && 'text-primary-violet',
								status === 'error' && 'text-error-red',
							)}
						/>

						<div className='text-lg font-medium'>{STATUS_POPUP_TEXT[statusTextKey]?.title}</div>

						<div className='mt-4'>{STATUS_POPUP_TEXT[statusTextKey]?.description}</div>
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
