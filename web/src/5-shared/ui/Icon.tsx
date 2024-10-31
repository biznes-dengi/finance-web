import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowTrendingUpIcon,
	ArrowUpRightIcon,
	CalendarIcon,
	CameraIcon,
	CheckIcon,
	CheckCircleIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	CloudArrowUpIcon,
	MagnifyingGlassIcon,
	PencilIcon,
	XMarkIcon,
	XCircleIcon,
	UserIcon,
} from '@heroicons/react/24/solid';
import {BriefcaseIcon, FolderPlusIcon, PlusIcon, FolderIcon} from '@heroicons/react/24/outline';

import {cn} from '@shared/lib';

/** Icons should be medium-bold, to corellate with text */

export const Icon = {
	PORTFOLIO: <BriefcaseIcon className={cn('h-6 w-6 text-primary-grey')} />,
	// APP_LOGO: <img src={pyramidIconPath} alt='pyramid icon' />,
	// HOME: <img src={homeIconPath} alt='home icon' />,
	// CALCULATOR: <img src={calculatorIconPath} alt='calculator icon' />,
	// INVEST: <img src={investIconPath} alt='invest icon' />,
	// TRACKER: <img src={trackerIconPath} alt='tracker icon' />,
	// user: <img src={userIconPath} alt='user icon' />,

	search: <MagnifyingGlassIcon className='h-4 w-4' />,
	camera: <CameraIcon className='h-5 w-5' />,
	user: <UserIcon className='h-5 w-5' />,

	x: <XMarkIcon />,
	backButton: <ArrowLeftIcon />,
	createGoal: <FolderPlusIcon />,
	fund: <PlusIcon />,
	transfer: <ArrowUpRightIcon />,
	withdraw: <ArrowDownIcon />,
	rightChevron: <ChevronRightIcon />,
	check: <CheckIcon />,
	uploadImage: <CloudArrowUpIcon />,
	transferTo: <ArrowDownIcon />,
	trendUp: <ArrowTrendingUpIcon />,
	edit: <PencilIcon />,
	calendar: <CalendarIcon />,
	chevronDown: <ChevronDownIcon />,
	success: <CheckCircleIcon />,
	error: <XCircleIcon />,
	goal: <FolderIcon />,
};
