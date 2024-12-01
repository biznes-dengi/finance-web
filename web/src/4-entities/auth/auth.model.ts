import {useMutation, useQuery} from '@tanstack/react-query';
import {authApi} from '@entities/auth/auth.api.ts';
import {useNavigate} from 'react-router-dom';
import {APP_PATH} from '@shared/constants';

class AuthModel {
	useAuthUser() {
		const {data} = useQuery({
			queryKey: ['auth-user'],
			queryFn: () => authApi.fetchAuthUser(),
		});

		return data;
	}

	useSignup() {
		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['signup'],
			mutationFn: (payload: any) => {
				return authApi.signup(payload);
			},
			onSuccess: () => {
				setTimeout(() => {
					navigate(APP_PATH.home);
				}, 2500);
			},
			onError: () => {
				alert('Signup failed');
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
				navigate(APP_PATH.home);
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
