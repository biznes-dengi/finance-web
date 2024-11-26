import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, ButtonType, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {authModel} from '@entities/auth';
import {cn} from '@shared/lib';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const {login, isLoginPending} = authModel.useLogin();

	const [disabledBoxShadow, setDisabledBoxShadow] = useState(false);

	useEffect(() => {
		document.title = 'Log in | Finansy';

		return () => {
			document.title = 'Finansy';
		};
	}, []);

	useEffect(() => {
		function handleKeyUp(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				handleLogin();
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

	function handleLogin() {
		const payload = {
			email,
			password,
		};

		login(payload);
	}

	return (
		<div className='relative'>
			<div className='absolute top-0 ml-8 mt-6 cursor-default text-xl font-bold'>{APP_TEXT.finansy}</div>
			<div className='flex h-screen flex-col items-center justify-center'>
				<div>
					<div className='mb-6 text-3xl font-bold'>{APP_TEXT.enterCredentials}</div>

					<div className='flex w-[350px] flex-col gap-4'>
						<TextField type='email' value={email} onChange={setEmail} placeholder={APP_TEXT.email} isAutoFocus />
						<TextField type='password' value={password} onChange={setPassword} placeholder={APP_TEXT.password} />
						<Button
							className='w-fit text-left font-light'
							onClick={() => alert('Пока не можем помочь. Вспоминай, а то не войдешь :)')}
						>
							{APP_TEXT.forgotPassword}
						</Button>
					</div>

					<div className='my-6 flex flex-col items-center gap-4'>
						<Button
							type={ButtonType.main}
							onClick={handleLogin}
							disabled={!email || !password}
							className={cn(disabledBoxShadow && 'shadow-none')}
							isLoading={isLoginPending}
						>
							{APP_TEXT.logIn}
						</Button>
						<Button onClick={() => navigate(APP_PATH.signUp)} isFetching={isLoginPending}>
							{APP_TEXT.signUp}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
