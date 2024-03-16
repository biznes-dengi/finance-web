import {AppProvider} from '@app/providers';
import {AppRouter} from '@app/router';
import {AppHeader} from '@widgets/app/app-header';
import {AppSidebar} from '@widgets/app/app-sidebar';

import {cn} from '@shared/helpers';

export function App() {
	const showSidebar = true;

	return (
		<AppProvider>
			<div role='app-container' className='relative flex h-screen justify-between bg-[#F7F7F7] px-6 py-8'>
				<div role='app-sidebar' className='w-52'>
					{showSidebar && <AppSidebar />}
				</div>

				<div role='app-content' className={cn('flex w-[80%] flex-col')}>
					<AppHeader />
					<AppRouter />
				</div>
			</div>
		</AppProvider>
	);
}
