import {Drawer as VaulDrawer} from 'vaul';
import {useEffect, useState} from 'react';
import {statusDuration} from '../lib/StatusPopup.helpers.ts';
import {StatusPopupProps} from '../types/StatusPopup.types.ts';
import {STATUS_POPUP_TEXT} from '../constants/StatusPopup.constants.tsx';
import {Icon} from '@shared/ui';
import {cn} from '@shared/lib';

const {Root, Overlay, Content, Portal, Title} = VaulDrawer;

export function StatusPopup(props: StatusPopupProps) {
	const {isOpen, status, statusTextKey, statusTextProps} = props;

	const [progress, setProgress] = useState(0);
	const [isDismissible, setIsDismissible] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		setIsPopupOpen(true);

		const timeoutId = setTimeout(() => {
			setIsDismissible(true);
			setIsPopupOpen(false);
		}, statusDuration + 200);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isOpen]);
	useEffect(() => {
		if (!isOpen) return;

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

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [isOpen]);

	return (
		<Root open={isPopupOpen} dismissible={isDismissible}>
			<Portal>
				<Overlay className='fixed inset-0 bg-black/40' />

				<Content className='fixed bottom-0 left-0 right-0 rounded-t-3xl bg-light-grey outline-none transition-all duration-200'>
					<Title className='hidden' />

					<div
						className={cn(
							'mx-auto flex w-full max-w-md flex-col overflow-auto p-4 pt-2 text-center',
							isOpen && 'items-center',
						)}
					>
						<div className='mx-auto mb-4 h-1 w-12 rounded-full bg-secondary-grey'>
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

						<div className='text-lg font-medium'>{STATUS_POPUP_TEXT[statusTextKey](statusTextProps)}</div>
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
