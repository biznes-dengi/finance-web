import {ReactElement} from 'react';

import {BriefcaseIcon} from '@heroicons/react/24/outline';

// @ts-ignore
import userIconPath from '@shared/assets/user.svg';
// @ts-ignore
import pyramidIconPath from '@shared/assets/pyramid.svg';
import {cn} from '@shared/helpers';

export const APP_ICON = {
	USER: 'USER',
	APP_LOGO: 'APP_LOGO',
	PORTFOLIO: 'PORTFOLIO',
} as const;

const iconMap = {
	[APP_ICON.USER]: ({className}: {className: string}) => (
		<img src={userIconPath} alt='user icon' className={cn(className)} />
	),
	[APP_ICON.APP_LOGO]: ({className}: {className: string}) => (
		<img src={pyramidIconPath} alt='pyramid icon' className={cn(className)} />
	),
	[APP_ICON.PORTFOLIO]: ({className}: {className: string}) => (
		<BriefcaseIcon className={cn(className, 'h-6 w-6 text-primary-grey')} />
	),
} as any;

type IconProps = {
	name: string;
	className?: string;
};

export const Icon = ({name, className}: IconProps) => {
	const AppIcon = iconMap[name];

	return <AppIcon {...{className}} />;
};

type IconButtonProps = {
	children: ReactElement;
	handleClick: () => void;
};

export function IconButton({children, handleClick}: IconButtonProps) {
	return (
		<button
			className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-secondary-violet'
			onClick={handleClick}
		>
			<div className='h-5 w-5'>{children}</div>
		</button>
	);
}
