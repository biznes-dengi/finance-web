import {APP_ICON, Icon, IconButton, TabConfig, Tabs} from '@shared/ui';
import {useNavigate} from 'react-router-dom';
import {APP_ROUTER} from '@shared/constants';

const tabConfigs = [{label: 'Goal', path: APP_ROUTER.root}];

export function AppHeader() {
	const navigate = useNavigate();

	function handleTabChange(tabConfig: TabConfig) {
		if (tabConfig?.path) navigate(tabConfig.path);
	}

	return (
		<>
			<header className='flex min-w-full items-center justify-between'>
				<IconButton handleClick={() => alert('click user icon')}>
					<Icon name={APP_ICON.USER} />
				</IconButton>
			</header>
			<Tabs tabConfigs={tabConfigs} handleChange={handleTabChange} className='my-8 min-w-full' isOutsideCard />
		</>
	);
}
