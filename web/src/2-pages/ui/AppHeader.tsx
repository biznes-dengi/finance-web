import {Button, ButtonType, Icon} from '@shared/ui';
import {authModel} from '@entities/auth';

export function AppHeader() {
	const {logout} = authModel.useLogout();

	return (
		<header role='app-header' className='mb-4'>
			<Button onClick={() => logout()} type={ButtonType.icon} icon={Icon.user} />
		</header>
	);
}
