import {cn} from '@shared/lib';
import {ICON_MAP, type IconType} from '../config/Icon.config.tsx';

export function Icon({type, className, ...rest}: {type: IconType; className?: string; onClick?: () => void}) {
	const Icon = ICON_MAP[type];

	return <Icon className={cn('shrink-0', className)} {...rest} />;
}
