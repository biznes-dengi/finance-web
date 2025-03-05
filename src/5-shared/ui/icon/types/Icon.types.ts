import {IconType} from '../config/Icon.config.tsx';

export type IconProps = {
	type: IconType;
	className?: string;
	onClick?: () => void;
	withBackground?: boolean;
};
