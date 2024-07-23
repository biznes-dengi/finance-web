import {APP_ICON, Button, BUTTON_TYPE} from '@shared/ui';

export function AppHeader() {
	return (
		<header role='app-header' className='mb-8'>
			<Button onClick={() => alert('click user icon')} type={BUTTON_TYPE.circle} icon={APP_ICON.USER} />
		</header>
	);
}
