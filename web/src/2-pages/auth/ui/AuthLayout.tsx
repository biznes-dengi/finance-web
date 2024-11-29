import {APP_PATH, APP_TEXT} from '@shared/constants';
import {cn, useResponsive} from '@shared/lib';
import {ReactNode} from 'react';
import {useLocation} from 'react-router-dom';

export function AuthLayout({children}: {children: ReactNode}) {
	const {isMobile} = useResponsive();

	const location = useLocation();

	return (
		<div className='px-4 py-6'>
			<div className={cn('cursor-default text-xl font-bold', isMobile ? 'text-center' : 'pl-8')}>
				{APP_TEXT.finansy}
			</div>
			<div className='flex h-[calc(100vh-76px)] flex-col items-center justify-center'>
				<div className={cn('w-full max-w-[350px]', location.pathname === APP_PATH.signUp && 'h-[436px]')}>
					{children}
				</div>
			</div>
		</div>
	);
}
