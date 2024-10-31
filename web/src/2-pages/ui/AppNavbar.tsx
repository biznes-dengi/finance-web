import {cn} from '@shared/lib';
import {Icon} from '@shared/ui';

const sidebarConfigs = [
	{
		label: 'Home',
		path: '/',
		icon: Icon.user,
	},
	{
		label: 'Tracker',
		path: '/',
		icon: Icon.user,
	},
	{
		label: 'Invest',
		path: '/',
		icon: Icon.user,
	},
	{
		label: 'Calculator',
		path: '/',
		icon: Icon.user,
	},
];

/**
 * 1. navigate(path) = history.push(path) -- const navigate = useNavigate();
 * 2. for nav items hover box shadow (with space between active and hovered elements)
 */

export function AppNavbar() {
	return (
		<div role='app-navbar' className='w-52'>
			<div className='mb-12 flex pl-4 text-2xl font-bold'>{Icon.user}</div> {/* APP LOGO */}
			<nav>
				{sidebarConfigs.map(({label, path, icon}, index) => (
					<div
						className={cn(
							'flex cursor-pointer rounded-2xl px-4 py-3 hover:bg-secondary-grey',
							index === 0 && 'bg-white',
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
	);
}
