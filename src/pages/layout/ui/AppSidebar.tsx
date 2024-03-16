import {APP_ICON, Icon} from '@shared/ui';

import {cn} from '@shared/lib';
import {APP_PATH} from '@shared/constants';

const sidebarConfigs = [
	{
		label: 'Home',
		path: APP_PATH.root,
		Icon: ({className}: {className?: string}) => <Icon className={className} name={APP_ICON.HOME} />,
	},
	{
		label: 'Tracker',
		path: APP_PATH.root,
		Icon: ({className}: {className?: string}) => <Icon className={className} name={APP_ICON.TRACKER} />,
	},
	{
		label: 'Invest',
		path: APP_PATH.root,
		Icon: ({className}: {className?: string}) => <Icon className={className} name={APP_ICON.INVEST} />,
	},
	{
		label: 'Calculator',
		path: APP_PATH.root,
		Icon: ({className}: {className?: string}) => <Icon className={className} name={APP_ICON.CALCULATOR} />,
	},
];

/**
 * 1. navigate(path) = history.push(path) -- const navigate = useNavigate();
 *  2. for nav items hover box shadow (with space between active and hovered elements)
 */

export function AppSidebar() {
	return (
		<>
			<div className='mb-12 flex pl-4 text-2xl font-bold'>
				<Icon name={APP_ICON.APP_LOGO} />
			</div>
			<nav>
				{sidebarConfigs.map(({label, path, Icon}, index) => (
					<div
						className={cn(
							'flex cursor-pointer rounded-2xl px-4 py-3 hover:bg-secondary-grey',
							index === 0 && 'bg-white',
						)}
						key={label + path}
						onClick={() => alert(label + ' module')}
					>
						<Icon className='mr-4' />
						<div className={cn('font-medium text-primary-grey', index === 0 && 'text-primary-blue')}>{label}</div>
					</div>
				))}
			</nav>
		</>
	);
}
