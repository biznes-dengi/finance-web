import {useEffect, useState} from 'react';
import {AuthLayout} from './AuthLayout.tsx';
import {AppIcon, Box, Button, ButtonType, Dialog, PageHeader, TextField, useDialogState} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {authModel} from '@entities/auth';
import {cn} from '@shared/lib';

export function SignupPage() {
	const {dialogRef, openDialog, closeDialog} = useDialogState();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [disabledBoxShadow, setDisabledBoxShadow] = useState(false);

	const {signup, isSignupPending, isSignupSuccess, isSignupError} = authModel.useSignup();

	useEffect(() => {
		document.title = 'Sign up | Finansy';

		return () => {
			document.title = 'Finansy';
		};
	}, []);

	useEffect(() => {
		function handleKeyUp(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				handleSignup();
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				setDisabledBoxShadow(true);
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [email, password]);

	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (!isSignupSuccess) return;

		openDialog();

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

		setTimeout(closeDialog, 2000);
	}, [isSignupSuccess]);

	function handleSignup() {
		const payload = {
			role: 'ADMIN',
			email,
			pass: password,
			nickname: 'string',
			gender: 'MALE',
			dateOfBirth: '2024-11-23',
			phoneNumber: 'string',
			createdOn: '2024-11-23T13:51:28.912Z',
		};

		signup(payload);
	}

	return (
		<AuthLayout>
			<div className='h-[436px]'>
				<PageHeader title={APP_TEXT.createAccount} backPath={APP_PATH.logIn} />

				<div className='flex w-[350px] flex-col gap-4'>
					<TextField type='email' value={email} onChange={setEmail} placeholder={APP_TEXT.username} isAutoFocus />
					<TextField type='password' value={password} onChange={setPassword} placeholder={APP_TEXT.password} />
					{isSignupError && <div className='text-red-700'>Some error occur</div>}
				</div>

				<div className='my-6 flex flex-col items-center gap-4'>
					<Button
						type={ButtonType.main}
						onClick={handleSignup}
						disabled={!email || !password}
						className={cn(disabledBoxShadow && 'shadow-none')}
						isLoading={isSignupPending}
					>
						{APP_TEXT.signUp}
					</Button>
				</div>
			</div>

			<Dialog ref={dialogRef} showUX={true} progress={progress}>
				<Box baseMarginY className='text-center'>
					<div className='flex flex-col items-center pb-4'>
						<AppIcon type='check' className='mb-5 size-10 text-primary-violet' />
						<div className='text-center font-semibold'>
							Your account has been <span className='text-primary-violet'>successfully</span> created
						</div>
						<div className='mt-2'>Welcome to Finansy family 🤗</div>
					</div>
				</Box>
			</Dialog>
		</AuthLayout>
	);
}
