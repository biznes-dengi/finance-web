import {useMutation} from '@tanstack/react-query';
import {authApi} from '@entities/auth/auth.api.ts';
import {useNavigate} from 'react-router-dom';
import {APP_PATH} from '@shared/constants';

class AuthModel {
	useRegister() {
		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['register'],
			mutationFn: (payload: any) => {
				return authApi.register(payload);
			},
			onSuccess: () => {
				navigate(APP_PATH.login);
			},
		});

		return {
			register: mutate,
			isRegisterPending: isPending,
			isRegisterSuccess: isSuccess,
			isRegisterError: isError,
		};
	}

	useLogin() {
		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['login'],
			mutationFn: (payload: any) => {
				return authApi.login(payload);
			},
			onSuccess: () => {
				navigate(APP_PATH.goalList);
			},
			onError: () => {
				alert('Login failed');
			},
		});

		return {
			login: mutate,
			isLoginPending: isPending,
			isLoginSuccess: isSuccess,
			isLoginError: isError,
		};
	}

	useLogout() {
		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['logout'],
			mutationFn: () => {
				return authApi.logout();
			},
			onSuccess: () => {
				navigate(APP_PATH.login);
			},
		});

		return {
			logout: mutate,
			isLogoutPending: isPending,
			isLogoutSuccess: isSuccess,
			isLogoutError: isError,
		};
	}
}

export const authModel = new AuthModel();
