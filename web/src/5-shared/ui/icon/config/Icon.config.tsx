import {EyeIcon, EyeOffIcon, Search, TrendingUp} from 'lucide-react';
import {
	FaArrowDown,
	FaArrowLeft,
	FaArrowUp,
	FaCalendar,
	FaCheck,
	FaChevronDown,
	FaFolderPlus,
	FaPen,
	FaPlus,
	FaUser,
	FaXmark,
} from 'react-icons/fa6';
import {FaCamera} from 'react-icons/fa';
import {cn} from '@shared/lib';

export const ICON_MAP = {
	user: FaUser,

	showPassword: EyeIcon,
	hidePassword: EyeOffIcon,

	createGoal: FaFolderPlus,
	fund: FaPlus,
	withdraw: FaArrowDown,
	transfer: ({className}: {className: string}) => <FaArrowUp className={cn('rotate-45 transform', className)} />,

	transferTo: FaArrowDown,

	x: FaXmark,
	check: FaCheck,

	success: FaCheck,
	error: FaXmark,

	backButton: FaArrowLeft,

	selectChevron: FaChevronDown,

	uploadImage: FaCamera,

	trendUp: TrendingUp,

	edit: FaPen,
	calendar: FaCalendar,

	search: Search,
} as const;

export type IconType = keyof typeof ICON_MAP;
