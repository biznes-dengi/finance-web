import {Outlet} from 'react-router-dom';

import {AppHeader} from './AppHeader.tsx';
import {AppNavbar} from './AppNavbar.tsx';

import {cn} from '@shared/lib';

export function AppLayout() {
	//when isDesktop = true -> navbar is showing
	const isDesktop = false;

	return (
		<div
			role='app-layout'
			className={cn('mx-auto min-h-screen max-w-xl', isDesktop ? 'flex justify-between px-6 py-8' : 'p-4')}
		>
			{isDesktop && <AppNavbar />}

			<div role='app-content' className='w-full'>
				<AppHeader />
				<Outlet />
			</div>
		</div>
	);
}
