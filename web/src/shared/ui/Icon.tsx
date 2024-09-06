// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import userIconPath from '../../../assets/user.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pyramidIconPath from '../../../assets/pyramid.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import homeIconPath from '../../../assets/home-primary-violet.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import calculatorIconPath from '../../../assets/calculator.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import trackerIconPath from '../../../assets/tracker.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import investIconPath from '../../../assets/invest.svg';

import {
	ArrowDownIcon,
	ArrowLeftIcon,
	ArrowTrendingUpIcon,
	ArrowUpRightIcon,
	CalendarIcon,
	CameraIcon,
	CheckIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	CloudArrowUpIcon,
	MagnifyingGlassIcon,
	PencilIcon,
	XMarkIcon,
} from '@heroicons/react/24/solid';
import {BriefcaseIcon, EllipsisVerticalIcon, FolderPlusIcon, PlusIcon} from '@heroicons/react/24/outline';

import {cn} from '@shared/lib';

/** Icons should be medium-bold, to corellate with text */

export const Icon = {
	APP_LOGO: <img src={pyramidIconPath} alt='pyramid icon' />,
	PORTFOLIO: <BriefcaseIcon className={cn('h-6 w-6 text-primary-grey')} />,
	HOME: <img src={homeIconPath} alt='home icon' />,
	CALCULATOR: <img src={calculatorIconPath} alt='calculator icon' />,
	INVEST: <img src={investIconPath} alt='invest icon' />,
	TRACKER: <img src={trackerIconPath} alt='tracket icon' />,

	search: <MagnifyingGlassIcon className='h-4 w-4' />,
	camera: <CameraIcon className='h-5 w-5' />,
	user: <img src={userIconPath} alt='user icon' />,

	x: <XMarkIcon />,
	backButton: <ArrowLeftIcon />,
	createGoal: <FolderPlusIcon />,
	fund: <PlusIcon />,
	transfer: <ArrowUpRightIcon />,
	more: <EllipsisVerticalIcon />,
	rightChevron: <ChevronRightIcon />,
	check: <CheckIcon />,
	uploadImage: <CloudArrowUpIcon />,
	transferTo: <ArrowDownIcon />,
	trendUp: <ArrowTrendingUpIcon />,
	edit: <PencilIcon />,
	calendar: <CalendarIcon />,
	selectArrow: <ChevronDownIcon />,
};
