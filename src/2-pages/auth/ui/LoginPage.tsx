import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthLayout} from './AuthLayout.tsx';
import {AuthModel} from '@entities/auth';
import {Button, PageHeader, TextField} from '@shared/ui';
import {cn, useKeyClick} from '@shared/lib';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function LoginPage() {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	const [displayBoxShadow, setDisplayBoxShadow] = useState(false);

	const {login, isLoginPending, isLoginError} = AuthModel.useLogin();

	useEffect(() => {
		document.title = 'Log in | Finansy';

		return () => {
			document.title = 'Finansy';
		};
	}, []);
	useEffect(() => {
		if (email && password) {
			setDisplayBoxShadow(true);
		}

		if (isLoginError) {
			setDisplayBoxShadow(true);
		}
	}, [isLoginError, email, password]);

	useKeyClick({
		key: 'Enter',
		onKeyUp: () => setIsPasswordFocused(true),
		disabled: isPasswordFocused,
	});
	useKeyClick({
		key: 'Enter',
		onKeyDown: () => setDisplayBoxShadow(false),
		onKeyUp: () => {
			setIsPasswordFocused(false);
			handleLogin();
		},
		disabled: !email || !password || isEmailFocused,
		deps: [email, password],
	});

	function handleLogin() {
		const payload = {
			email,
			password,
		};

		login(payload);
	}

	return (
		<AuthLayout>
			<PageHeader title={APP_TEXT.welcome} withBackButton={false} withNoSpace />

			<div className='flex w-full flex-col gap-4'>
				<TextField
					type='email'
					value={email}
					onChange={setEmail}
					placeholder={APP_TEXT.email}
					enterKeyHint='next'
					isFocused={isEmailFocused}
					setIsFocused={setIsEmailFocused}
				/>
				<TextField
					type='password'
					value={password}
					onChange={setPassword}
					placeholder={APP_TEXT.password}
					enterKeyHint='done'
					isFocused={isPasswordFocused}
					setIsFocused={setIsPasswordFocused}
				/>

				<Button type='text' className='text-left font-light' onClick={() => alert('Вспоминай, а то не войдешь 😁')}>
					{APP_TEXT.forgotPassword}
				</Button>
			</div>

			<div className='my-6 flex flex-col items-center gap-4'>
				<Button
					type='primary'
					onClick={handleLogin}
					disabled={!email || !password}
					className={cn(!displayBoxShadow && 'shadow-none')}
					isPending={isLoginPending}
					disabledPrimaryButtonEnterClick
				>
					{APP_TEXT.logIn}
				</Button>
				<Button type='text' onClick={() => navigate(APP_PATH.signup)} isLoading={isLoginPending}>
					{APP_TEXT.signUp}
				</Button>
			</div>
		</AuthLayout>
	);
}
