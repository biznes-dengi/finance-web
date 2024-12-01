import {Drawer as VaulDrawer} from 'vaul';
import {useEffect, useRef, useState} from 'react';
import {AppIcon, STATUS_DIALOG_TEXT} from '@shared/ui';
import {StatusDialogProps} from '../types/StatusPopup.types.ts';
import {cn} from '@shared/lib';

const {Root, Trigger, Close, Overlay, Content, Portal} = VaulDrawer;

export function StatusPopup({isOpen, status, statusTextKey}: StatusDialogProps) {
	const [progress, setProgress] = useState(0);

	const openButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		openDrawer();

		const duration = 2000; // 2 секунды для полного прогресса
		const start = performance.now(); // Начальное время анимации

		const animate = (time: any) => {
			const elapsed = time - start; // Сколько времени прошло с начала анимации
			const percentage = Math.min((elapsed / duration) * 100, 100); // Рассчитываем прогресс
			setProgress(percentage); // Обновляем значение прогресса

			if (elapsed < duration) {
				requestAnimationFrame(animate); // Если ещё не завершено, продолжаем анимацию
			}
		};

		requestAnimationFrame(animate); // Запускаем анимацию

		setTimeout(closeDrawer, 2000);
	}, [isOpen]);

	function openDrawer() {
		openButtonRef.current && openButtonRef.current.click();
	}
	function closeDrawer() {
		closeButtonRef.current && closeButtonRef.current.click();
	}

	return (
		<Root dismissible={!isOpen}>
			<Trigger ref={openButtonRef} className='hidden' />
			<Close ref={closeButtonRef} className='hidden' />

			<Portal>
				<Overlay className='fixed inset-0 bg-black/40' />

				<Content className='fixed bottom-0 left-0 right-0 rounded-t-3xl bg-light-grey outline-none transition-all duration-200'>
					<div
						className={cn(
							'mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-2xl p-4 pt-2',
							isOpen && 'items-center',
						)}
					>
						<div className='mx-auto mb-4 h-1.5 w-12 rounded-full bg-secondary-grey'>
							<div className='h-full rounded-full bg-[#BAC3CA]' style={{width: `${progress}%`}} />
						</div>

						<AppIcon
							type={status}
							className={cn('mb-4 size-10', status === 'success' ? 'text-primary-violet' : 'text-error-red')}
						/>
						<div className='font-semibold'>{STATUS_DIALOG_TEXT[statusTextKey].title}</div>
						<div className='mt-2'>{STATUS_DIALOG_TEXT[statusTextKey].description}</div>
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
