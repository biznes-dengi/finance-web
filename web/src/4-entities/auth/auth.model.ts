import {useMutation, useQuery} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {AuthApi} from '@entities/auth';
import {APP_PATH} from '@shared/constants';

// permissions
// featureAccess
// preferences
// 	- ui-main-color
// 	- language
// 	- currency

class AuthModel {
	useAuthUser() {
		const {data, isFetching} = useQuery({
			queryKey: ['auth-user'],
			queryFn: () => AuthApi.fetchAuthUser(),
		});

		return {
			authUser: data,
			isAuthUserFetching: isFetching,
		};
	}

	useSignup() {
		const navigate = useNavigate();

		const {mutate, isPending, isError, isSuccess} = useMutation({
			mutationKey: ['signup'],
			mutationFn: (payload: any) => {
				return AuthApi.signup(payload);
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
				return AuthApi.login(payload);
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
				return AuthApi.logout();
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
