import {Outlet} from 'react-router-dom';

export function AppScreenLayout() {
	return (
		<div className='flex min-h-screen flex-col'>
			<Outlet />
		</div>
	);
}
