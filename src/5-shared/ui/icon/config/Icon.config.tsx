import {Search, TrendingUp} from 'lucide-react';
import {
	FaArrowDown,
	FaArrowLeft,
	FaArrowRight,
	FaArrowUp,
	FaBriefcase,
	FaCalendar,
	FaCheck,
	FaChevronDown,
	FaChevronLeft,
	FaChevronRight,
	FaDollarSign,
	FaInfo,
	FaPen,
	FaPlus,
	FaShare,
	FaStar,
	FaTrash,
	FaUser,
	FaWallet,
	FaXmark,
} from 'react-icons/fa6';
import {FaCamera, FaSignOutAlt, FaEye, FaEyeSlash} from 'react-icons/fa';
import {cn} from '@shared/lib';
import {BsThreeDotsVertical} from 'react-icons/bs';

export const ICON_MAP = {
	user: FaUser,
	logout: FaSignOutAlt,

	show: FaEye,
	hide: FaEyeSlash,

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
	info: FaInfo,
	settings: BsThreeDotsVertical,
	dollar: FaDollarSign,
	wallet: FaWallet,
	share: FaShare,
	delete: FaTrash,
	portfolio: FaBriefcase,

	trendUp: TrendingUp,
} as const;

export type IconType = keyof typeof ICON_MAP;
