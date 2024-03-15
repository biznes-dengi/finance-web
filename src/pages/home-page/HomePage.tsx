import {useNavigate} from 'react-router-dom';

import {Goal} from '@entities/goal';
import {TabConfig, Tabs} from '@shared/ui';

import {APP_ROUTER} from '@shared/constants';

/** В будущем может переименоваться из HomePage в ЛичныеФинансыPage **/

const tabConfigs = [{label: 'Goals', path: APP_ROUTER.root}, {label: 'Expenses'}];

export function HomePage() {
	const navigate = useNavigate();

	function handleTabChange(tabConfig: TabConfig) {
		tabConfig?.path && navigate(tabConfig.path);
	}

	return (
		<>
			<Tabs tabConfigs={tabConfigs} handleChange={handleTabChange} className='my-8 min-w-full' isOutsideCard />
			<Goal />
		</>
	);
}
