import {useMutation} from '@tanstack/react-query';
import {authApi} from '@entities/auth/auth.api.ts';
import {useNavigate} from 'react-router-dom';
import {APP_PATH} from '@shared/constants';
import {authService} from '@entities/auth/auth.service.ts';

class AuthModel {
	useSignup() {
		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['signup'],
			mutationFn: (payload: any) => {
				return authApi.signup(payload);
			},
			onSuccess: (response) => {
				setTimeout(() => {
					authService.startSession(`Bearer ${response}`);
					navigate(APP_PATH.goalList);
				}, 2500);
			},
		});

		return {
			signup: mutate,
			isSignupPending: isPending,
			isSignupSuccess: isSuccess,
			isSignupError: isError,
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
				navigate(APP_PATH.logIn);
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
