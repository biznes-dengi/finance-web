import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {APP_PATH} from '@shared/constants';
import {authApi} from '@entities/auth';

/**
 * Abstraction for DRY logic across routes
 * permissions
 * licenses
 * auth
 * */

export function PrivateRoute({page}: {page: ReactNode}) {
	if (!authApi.token) {
		return <Navigate to={APP_PATH.login} replace />;
	} else {
		authApi.setupInterceptor(authApi.token);
	}

	return page;
}
