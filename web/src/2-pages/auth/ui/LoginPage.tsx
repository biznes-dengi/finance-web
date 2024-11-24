import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, ButtonType, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {authModel} from '@entities/auth';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const {login: loginAction, isLoginPending} = authModel.useLogin();

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				handleLogin();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [email, password]);

	function handleLogin() {
		const payload = {
			email,
			password,
		};

		loginAction(payload);
	}

	return (
		<div className='relative'>
			<div className='absolute top-0 pl-8 pt-6 text-xl font-bold'>Finansy</div>
			<div className='flex h-screen flex-col items-center justify-center'>
				<div>
					<div className='mb-6 text-3xl font-bold'>{APP_TEXT.login}</div>

					<div className='flex w-[350px] flex-col gap-4'>
						<TextField type='email' value={email} onChange={setEmail} placeholder={APP_TEXT.email} isAutoFocus />
						<TextField type='password' value={password} onChange={setPassword} placeholder={APP_TEXT.password} />
					</div>

					<div className='relative mt-8 flex flex-col gap-4'>
						<Button type={ButtonType.main} onClick={handleLogin}>
							{APP_TEXT.logIn}
						</Button>
						<Button
							onClick={() => navigate(APP_PATH.register)}
							isFetching={isLoginPending}
							className='absolute bottom-[-36px] left-[148px]'
						>
							{APP_TEXT.register}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
