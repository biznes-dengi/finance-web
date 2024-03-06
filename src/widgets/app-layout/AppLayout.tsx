import {ReactElement} from 'react';
import {AppSidebar} from '@widgets/app-layout/ui/app-sidebar';
import {AppHeader} from '@widgets/app-layout/ui/app-header';

type Props = {
	RouteElement: ReactElement;
};

export function AppLayout({RouteElement}: Props) {
	return (
		<div className='relative flex h-screen justify-between bg-[#F7F7F7] px-6 py-8'>
			<AppSidebar />

			<div role='app-content' className='flex w-1/2 flex-col'>
				<AppHeader />
				{RouteElement}
			</div>

			<div role='right-side-column' />
		</div>
	);
}
