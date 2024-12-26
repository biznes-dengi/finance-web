import {useEffect, useState} from 'react';
import {AuthLayout} from './AuthLayout.tsx';
import {AuthModel} from '@entities/auth';
import {Button, ButtonType, PageHeader, StatusPopup, TextField} from '@shared/ui';
import {cn, useKeyClick} from '@shared/lib';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function SignupPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	const [displayBoxShadow, setDisplayBoxShadow] = useState(false);

	const {signup, isSignupPending, isSignupSuccess, isSignupError} = AuthModel.useSignup();

	useEffect(() => {
		document.title = 'Sign up | Finansy';

		return () => {
			document.title = 'Finansy';
		};
	}, []);
	useEffect(() => {
		if (email && password) {
			setDisplayBoxShadow(true);
		}

		if (isSignupError) {
			setDisplayBoxShadow(true);
		}
	}, [isSignupError, email, password]);

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
			handleSignup();
		},
		disabled: !email || !password || isEmailFocused,
		deps: [email, password],
	});

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
		<>
			<AuthLayout>
				<PageHeader title={APP_TEXT.createAccount} backPath={APP_PATH.login} withNoSpace />

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
				</div>

				<div className='my-6 flex flex-col items-center gap-4'>
					<Button
						type={ButtonType.main}
						onClick={handleSignup}
						disabled={!email || !password}
						className={cn(!displayBoxShadow && 'shadow-none')}
						isLoading={isSignupPending}
						disableDefaultEnterClick
					>
						{APP_TEXT.signUp}
					</Button>
				</div>
			</AuthLayout>

			<StatusPopup isOpen={isSignupSuccess} status='success' statusTextKey='createAccountSuccess' />
		</>
	);
}
