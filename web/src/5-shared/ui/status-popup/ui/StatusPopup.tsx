import {Drawer as VaulDrawer} from 'vaul';
import {useEffect, useRef, useState} from 'react';
import {StatusDialogProps} from '../types/StatusPopup.types.ts';
import {Button, ButtonType, Icon, STATUS_DIALOG_TEXT} from '@shared/ui';
import {cn} from '@shared/lib';

const {Root, Trigger, Close, Overlay, Content, Portal} = VaulDrawer;

export function StatusPopup(props: StatusDialogProps) {
	const {isOpen, status, statusTextKey, yesButtonText, withDuration = true, duration = 2000} = props;

	const [progress, setProgress] = useState(0);

	const openButtonRef = useRef<HTMLButtonElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		openDrawer();
	}, [isOpen]);
	useEffect(() => {
		if (!withDuration) return;

		const animate = (time: any) => {
			const start = performance.now(); // Начальное время анимации

			const elapsed = time - start; // Сколько времени прошло с начала анимации
			const percentage = Math.min((elapsed / duration) * 100, 100); // Рассчитываем прогресс
			setProgress(percentage); // Обновляем значение прогресса

			if (elapsed < duration) {
				requestAnimationFrame(animate); // Если ещё не завершено, продолжаем анимацию
			}
		};

		requestAnimationFrame(animate); // Запускаем анимацию

		setTimeout(closeDrawer, duration);
	}, [isOpen]);

	function openDrawer() {
		openButtonRef.current && openButtonRef.current.click();
	}
	function closeDrawer() {
		closeButtonRef.current && closeButtonRef.current.click();
	}

	return (
		<Root dismissible={!withDuration}>
			<Trigger ref={openButtonRef} className='hidden' />
			<Close ref={closeButtonRef} className='hidden' />

			<Portal>
				<Overlay className='fixed inset-0 bg-black/40' />

				<Content className='fixed bottom-0 left-0 right-0 rounded-t-3xl bg-light-grey outline-none transition-all duration-200'>
					<div
						className={cn(
							'mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-2xl p-4 pt-2 text-center',
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
								status === 'congratulations' && 'text-3xl',
							)}
						/>

						<div className='text-lg font-semibold'>{STATUS_DIALOG_TEXT[statusTextKey].title}</div>

						<div className='mt-4'>{STATUS_DIALOG_TEXT[statusTextKey].description}</div>

						{yesButtonText && (
							<Button className='mt-4' type={ButtonType.main} onClick={closeDrawer}>
								{yesButtonText}
							</Button>
						)}
					</div>
				</Content>
			</Portal>
		</Root>
	);
}
