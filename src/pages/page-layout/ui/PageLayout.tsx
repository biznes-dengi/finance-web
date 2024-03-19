import {Outlet} from 'react-router-dom';

import {PageHeader} from './PageHeader.tsx';
import {PageSidebar} from './PageSidebar.tsx';

import {cn} from '@shared/lib';

export function PageLayout() {
	const isDesktop = false;

	return (
		<div role='app-container' className='relative flex h-screen justify-between bg-[#F7F7F7] px-6 py-8'>
			{isDesktop && (
				<div role='app-sidebar' className='w-52'>
					<PageSidebar />
				</div>
			)}

			<div role='app-content' className={cn('flex flex-col', isDesktop ? 'w-[80%]' : 'w-full')}>
				<PageHeader />
				<Outlet />
			</div>
		</div>
	);
}
