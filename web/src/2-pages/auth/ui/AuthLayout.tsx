import {APP_TEXT} from '@shared/constants';
import {cn, useResponsive} from '@shared/lib';
import {ReactNode} from 'react';

export function AuthLayout({children}: {children: ReactNode}) {
	const {isMobile} = useResponsive();
	return (
		<>
			<div className={cn('cursor-default pt-6 text-xl font-bold', isMobile ? 'text-center' : 'pl-8')}>
				{APP_TEXT.finansy}
			</div>
			<div className='flex h-[calc(100vh-44px)] flex-col items-center justify-center'>{children}</div>
		</>
	);
}
