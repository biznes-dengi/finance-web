import {BriefcaseIcon, FolderIcon} from '@heroicons/react/24/outline';
import {cn} from '@shared/lib';
// @ts-ignore
import userIconPath from '../../../../../assets/user.svg';
import {ArrowDown, ArrowLeft, ArrowUpRight, CheckIcon, CirclePlus, EyeIcon, EyeOffIcon, Plus, X} from 'lucide-react';
import {
	ArrowDownIcon,
	ArrowTrendingUpIcon,
	CalendarIcon,
	CameraIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	CloudArrowUpIcon,
	MagnifyingGlassIcon,
	PencilIcon,
} from '@heroicons/react/24/solid';

export const ICON_MAP = {
	PORTFOLIO: <BriefcaseIcon className={cn('h-6 w-6 text-primary-grey')} />,
	// APP_LOGO: <img src={pyramidIconPath} alt='pyramid icon' />,
	// HOME: <img src={homeIconPath} alt='home icon' />,
	// CALCULATOR: <img src={calculatorIconPath} alt='calculator icon' />,
	// INVEST: <img src={investIconPath} alt='invest icon' />,
	// TRACKER: <img src={trackerIconPath} alt='tracker icon' />,
	user: <img src={userIconPath} alt='user icon' />,
	// backButton: (
	// 	<span
	// 		style={{
	// 			display: 'inline-block',
	// 			width: '24px',
	// 			height: '24px',
	// 			backgroundImage: `url(${revolutBackButtonPath})`,
	// 			backgroundSize: 'contain',
	// 			backgroundRepeat: 'no-repeat',
	// 		}}
	// 	/>
	// ),

	backButton: <ArrowLeft />,

	search: <MagnifyingGlassIcon className='h-4 w-4' />,
	camera: <CameraIcon className='h-5 w-5' />,

	// fund: <PlusIcon />,

	rightChevron: <ChevronRightIcon />,
	uploadImage: <CloudArrowUpIcon />,
	transferTo: <ArrowDownIcon />,
	trendUp: <ArrowTrendingUpIcon />,
	edit: <PencilIcon />,
	calendar: <CalendarIcon />,
	chevronDown: <ChevronDownIcon />,
	goal: <FolderIcon />,

	showPassword: EyeIcon,
	hidePassword: EyeOffIcon,

	create: CirclePlus,
	fund: Plus,
	withdraw: ArrowDown,
	transfer: ArrowUpRight,

	x: X,
	check: CheckIcon,

	success: CheckIcon,
	error: X,
};
