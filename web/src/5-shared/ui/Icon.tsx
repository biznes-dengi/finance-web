import {
	ArrowDownIcon,
	ArrowTrendingUpIcon,
	ArrowUpRightIcon,
	CalendarIcon,
	CameraIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	CloudArrowUpIcon,
	MagnifyingGlassIcon,
	PencilIcon,
} from '@heroicons/react/24/solid';
import {BriefcaseIcon, FolderIcon, FolderPlusIcon, PlusIcon} from '@heroicons/react/24/outline';
import {cn} from '@shared/lib';
import {CheckIcon, EyeIcon, EyeOffIcon, X} from 'lucide-react';

// @ts-ignore
import revolutBackButtonPath from '../../../assets/revolutBackButton.svg';
// @ts-ignore
import userIconPath from '../../../assets/user.svg';

/** Icons should be medium-bold, to corellate with text */

export const ICON_MAP = {
	PORTFOLIO: <BriefcaseIcon className={cn('h-6 w-6 text-primary-grey')} />,
	// APP_LOGO: <img src={pyramidIconPath} alt='pyramid icon' />,
	// HOME: <img src={homeIconPath} alt='home icon' />,
	// CALCULATOR: <img src={calculatorIconPath} alt='calculator icon' />,
	// INVEST: <img src={investIconPath} alt='invest icon' />,
	// TRACKER: <img src={trackerIconPath} alt='tracker icon' />,
	user: <img src={userIconPath} alt='user icon' />,
	backButton: (
		<span
			style={{
				display: 'inline-block',
				width: '24px',
				height: '24px',
				backgroundImage: `url(${revolutBackButtonPath})`,
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat',
			}}
		/>
	),

	search: <MagnifyingGlassIcon className='h-4 w-4' />,
	camera: <CameraIcon className='h-5 w-5' />,

	// x: <XMarkIcon />,
	createGoal: <FolderPlusIcon />,
	fund: <PlusIcon />,
	transfer: <ArrowUpRightIcon />,
	withdraw: <ArrowDownIcon />,
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

	x: X,
	check: CheckIcon,

	success: CheckIcon,
	error: X,
};

export const Icon = {...ICON_MAP, x: 'XIcon', check: 'CheckIcon', success: 'SuccessIcon', error: 'ErrorIcon'};

export function AppIcon({
	type,
	className,
	...rest
}: {
	type: 'showPassword' | 'hidePassword' | 'x' | 'check' | 'success' | 'error';
	className?: string;
	onClick?: () => void;
}) {
	const Icon = ICON_MAP[type];

	return <Icon className={cn('shrink-0', className)} {...rest} />;
}
