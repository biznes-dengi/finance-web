import {EyeIcon, EyeOffIcon, Search, TrendingUp} from 'lucide-react';
import {
	FaArrowDown,
	FaArrowLeft,
	FaArrowRight,
	FaArrowUp,
	FaCalendar,
	FaCheck,
	FaChevronDown,
	FaChevronRight,
	FaPen,
	FaPlus,
	FaUser,
	FaXmark,
	FaStar,
} from 'react-icons/fa6';
import {FaCamera} from 'react-icons/fa';
import {cn} from '@shared/lib';

export const ICON_MAP = {
	user: FaUser,

	showPassword: EyeIcon,
	hidePassword: EyeOffIcon,

	createGoal: FaStar,
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

	depositTransaction: FaArrowLeft,
	withdrawTransaction: FaArrowRight,
	transferTransaction: ({className}: {className: string}) => (
		<FaArrowUp className={cn('rotate-45 transform', className)} />
	),

	chevronRight: FaChevronRight,

	congratulations: ({className}: {className: string}) => <div className={className}>🎉</div>,
} as const;

export type IconType = keyof typeof ICON_MAP;
