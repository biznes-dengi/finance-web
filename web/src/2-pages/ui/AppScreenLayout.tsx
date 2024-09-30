import {Outlet} from 'react-router-dom';

export function AppScreenLayout() {
	return (
		<div role='screen-layout' className='mx-auto flex min-h-screen max-w-xl flex-col'>
			<Outlet />
		</div>
	);
}
