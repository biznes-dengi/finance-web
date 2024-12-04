import {cn} from '@shared/lib';
import {ICON_MAP} from '../config/Icon.config.tsx';

export const Icon = {...ICON_MAP, x: 'XIcon', check: 'CheckIcon', success: 'SuccessIcon', error: 'ErrorIcon'};

export function AppIcon({
	type,
	className,
	...rest
}: {
	type:
		| 'showPassword'
		| 'hidePassword'
		| 'x'
		| 'check'
		| 'success'
		| 'error'
		| 'fund'
		| 'withdraw'
		| 'transfer'
		| 'chevronDown'
		| 'create';
	className?: string;
	onClick?: () => void;
}) {
	const Icon = ICON_MAP[type];

	return <Icon className={cn('shrink-0', className)} {...rest} />;
}
