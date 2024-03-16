import {Outlet} from 'react-router-dom';

import {AppHeader} from './AppHeader.tsx';
import {AppSidebar} from './AppSidebar.tsx';

import {cn} from '@shared/lib';

export function PageLayout() {
	const showSidebar = true;

	return (
		<div role='app-container' className='relative flex h-screen justify-between bg-[#F7F7F7] px-6 py-8'>
			<div role='app-sidebar' className='w-52'>
				{showSidebar && <AppSidebar />}
			</div>

			<div role='app-content' className={cn('flex w-[80%] flex-col')}>
				<AppHeader />
				<Outlet />
			</div>
		</div>
	);
}
