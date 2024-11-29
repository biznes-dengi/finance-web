import {useEffect, useState} from 'react';
import {AuthLayout} from './AuthLayout.tsx';
import {Button, ButtonType, PageHeader, StatusPopup, TextField} from '@shared/ui';
import {useKeyClick} from '../hooks/useKeyClick.ts';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {authModel} from '@entities/auth';
import {cn} from '@shared/lib';

export function SignupPage() {
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

	useKeyClick({
		key: 'Enter',
		onKeyDown: () => setDisabledBoxShadow(true),
		onKeyUp: handleSignup,
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
				<PageHeader title={APP_TEXT.createAccount} backPath={APP_PATH.logIn} />

				<div className='flex w-[350px] flex-col gap-4'>
					<TextField value={email} onChange={setEmail} placeholder={APP_TEXT.username} />
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
			</AuthLayout>

			<StatusPopup isOpen={isSignupSuccess} status='success' statusTextKey='accountCreated' />
		</>
	);
}
