import {APP_ICON, Icon, IconButton} from '@shared/ui';

export function PageHeader() {
	return (
		<header className='flex min-w-full items-center justify-between'>
			<IconButton handleClick={() => alert('click user icon')}>
				<Icon name={APP_ICON.USER} />
			</IconButton>
		</header>
	);
}
