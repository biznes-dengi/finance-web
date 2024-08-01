import {Button, ButtonType, Icon} from '@shared/ui';

export function AppHeader() {
	return (
		<header role='app-header' className='mb-8'>
			<Button onClick={() => alert('click user icon')} type={ButtonType.icon} icon={Icon.user} />
		</header>
	);
}
