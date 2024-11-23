import {cloneElement, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, ButtonType, Icon, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {authModel} from '@entities/auth';

// TODO: переиспользовать PageHeader

export function RegisterPage() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const {register, isRegisterPending, isRegisterError} = authModel.useRegister();

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Enter') {
				handleRegister();
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [login, password]);

	function handleRegister() {
		const payload = {
			role: 'ADMIN',
			email: login,
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
		<div className='flex h-screen flex-col items-center justify-center'>
			<div>
				<Button type={ButtonType.icon} onClick={() => navigate(APP_PATH.login)} className='mb-4 text-black'>
					{cloneElement(Icon.backButton, {className: 'h-6 w-6 text-black'})}
				</Button>
				<div className='mb-6 text-3xl font-bold'>{APP_TEXT.register}</div>

				<div className='flex w-80 flex-col gap-4'>
					<TextField type='email' value={login} onChange={setLogin} placeholder={APP_TEXT.email} isAutoFocus />
					<TextField type='password' value={password} onChange={setPassword} placeholder={APP_TEXT.password} />
				</div>

				<div className='mt-8 flex flex-col gap-4'>
					<Button type={ButtonType.main} onClick={handleRegister} isFetching={isRegisterPending}>
						{APP_TEXT.register}
					</Button>
					{isRegisterError && <div className='text-red-600'>Some error occur</div>}
				</div>
			</div>
		</div>
	);
}
