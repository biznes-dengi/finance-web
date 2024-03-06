import {cn} from '@shared/helpers';
import {APP_ROUTER} from '@shared/constants';
import {APP_ICON, Icon} from '@shared/ui';

const sidebarConfigs = [
	{
		label: 'Home',
		path: APP_ROUTER.root,
		Icon: () => <Icon name={APP_ICON.APP_LOGO} />,
	},
	{
		label: 'Portfolio',
		path: APP_ROUTER.root,
		Icon: () => <Icon name={APP_ICON.PORTFOLIO} />,
	},
];

export function AppSidebar() {
	// navigate(path) = history.push(path)
	// const navigate = useNavigate();

	return (
		<div role='app-sidebar' className='w-52'>
			<div className='mb-4 text-2xl font-bold'>Finansy</div>
			<nav className='min-w-full'>
				{sidebarConfigs.map(({label, path, Icon}, index) => (
					<button
						className={cn(
							'flex min-w-full rounded-2xl px-4 py-3 hover:bg-secondary-grey',
							index === 0 && 'hover:bg-white',
						)}
						key={label + path}
						onClick={() => alert(label + ' module')}
					>
						<Icon />
						<div className={cn('ml-4 font-medium text-primary-grey', index === 0 && 'text-primary-violet')}>
							{label}
						</div>
					</button>
				))}
			</nav>
		</div>
	);
}
