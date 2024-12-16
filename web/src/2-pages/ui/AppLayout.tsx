import {Outlet} from 'react-router-dom';
import {cn} from '@shared/lib';
import {Button, ButtonType, Icon} from '@shared/ui';
import {AuthModel} from '@entities/auth';

const sidebarConfigs = [
	{
		label: 'Home',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Tracker',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Invest',
		path: '/',
		icon: <div>Home</div>,
	},
	{
		label: 'Calculator',
		path: '/',
		icon: <div>Home</div>,
	},
];

export function AppLayout() {
	const {logout} = AuthModel.useLogout();

	const isDesktop = false;

	return (
		<div
			role='app-layout'
			className={cn('mx-auto min-h-screen max-w-[33rem]', isDesktop ? 'flex justify-between px-6 py-8' : 'p-4')}
		>
			{isDesktop && (
				<div role='app-navbar' className='w-52'>
					<div className='mb-12 flex pl-4 text-2xl font-bold'>
						<Icon type='user' />
					</div>
					{/* APP LOGO */}
					<nav>
						{sidebarConfigs.map(({label, path, icon}, index) => (
							<div
								className={cn(
									'flex cursor-pointer rounded-2xl px-4 py-3',
									index === 0 && 'bg-white',
									isDesktop && 'hover:bg-secondary-grey',
								)}
								key={label + path}
								onClick={() => alert(label + ' module')}
							>
								<div className={cn('mr-4')}>{icon}</div>
								<div className={cn('font-medium text-primary-grey', index === 0 && 'text-primary-violet')}>{label}</div>
							</div>
						))}
					</nav>
				</div>
			)}

			<div role='app-content' className='w-full'>
				<header role='app-header' className='mb-4'>
					<Button onClick={() => logout()} type={ButtonType.icon} icon={<Icon type='user' />} />
				</header>

				<Outlet />
			</div>
		</div>
	);
}
