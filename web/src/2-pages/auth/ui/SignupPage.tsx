import {useEffect, useState} from 'react';
import {AuthLayout} from './AuthLayout.tsx';
import {Button, ButtonType, PageHeader, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {authModel} from '@entities/auth';
import {cn} from '@shared/lib';

export function SignupPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [disabledBoxShadow, setDisabledBoxShadow] = useState(false);

	const {register, isRegisterPending, isRegisterError} = authModel.useRegister();

	useEffect(() => {
		document.title = 'Sign up | Finansy';

		return () => {
			document.title = 'Finansy';
		};
	}, []);

	useEffect(() => {
		function handleKeyUp(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				handleRegister();
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

	function handleRegister() {
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

		register(payload);
	}

	return (
		<AuthLayout>
			<div className='h-[436px]'>
				<PageHeader title={APP_TEXT.createAccount} backPath={APP_PATH.logIn} />

				<div className='flex w-[350px] flex-col gap-4'>
					<TextField type='email' value={email} onChange={setEmail} placeholder={APP_TEXT.email} isAutoFocus />
					<TextField type='password' value={password} onChange={setPassword} placeholder={APP_TEXT.password} />
					{isRegisterError && <div className='text-red-700'>Some error occur</div>}
				</div>

				<div className='my-6 flex flex-col items-center gap-4'>
					<Button
						type={ButtonType.main}
						onClick={handleRegister}
						disabled={!email || !password}
						className={cn(disabledBoxShadow && 'shadow-none')}
						isLoading={isRegisterPending}
					>
						{APP_TEXT.signUp}
					</Button>
				</div>
			</div>
		</AuthLayout>
	);
}
