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
	FaChevronLeft,
} from 'react-icons/fa6';
import {FaCamera, FaSignOutAlt} from 'react-icons/fa';
import {cn} from '@shared/lib';

export const ICON_MAP = {
	user: FaUser,
	logout: FaSignOutAlt,

	showPassword: EyeIcon,
	hidePassword: EyeOffIcon,

	createGoal: FaStar,
	fund: FaPlus,
	withdraw: FaArrowDown,
	transfer: ({className}: {className: string}) => <FaArrowUp className={cn('rotate-45 transform', className)} />,

	transferTo: FaArrowDown,

	success: FaCheck,
	error: FaXmark,

	backButton: FaArrowLeft,

	uploadImage: FaCamera,

	edit: FaPen,

	depositTransaction: FaArrowLeft,
	withdrawTransaction: FaArrowRight,
	transferTransaction: ({className}: {className: string}) => (
		<FaArrowUp className={cn('rotate-45 transform', className)} />
	),

	congratulations: ({className}: {className: string}) => <div className={className}>🎉</div>,

	selectChevron: FaChevronDown,

	plus: FaPlus,
	x: FaXmark,
	check: FaCheck,
	calendar: FaCalendar,
	search: Search,
	chevronLeft: FaChevronLeft,
	chevronRight: FaChevronRight,

	trendUp: TrendingUp,
} as const;

export type IconType = keyof typeof ICON_MAP;
