import {
	ArrowDown,
	ArrowLeft,
	ArrowUpRight,
	Calendar,
	Camera,
	CheckIcon,
	ChevronDown,
	EyeIcon,
	EyeOffIcon,
	FolderPlus,
	Plus,
	Search,
	TrendingUp,
	X,
} from 'lucide-react';

import EditRoundedIcon from '@mui/icons-material/EditRounded';

export const ICON_MAP = {
	// PORTFOLIO: <BriefcaseIcon className={cn('h-6 w-6 text-primary-grey')} />,
	// APP_LOGO: <img src={pyramidIconPath} alt='pyramid icon' />,
	// HOME: <img src={homeIconPath} alt='home icon' />,
	// CALCULATOR: <img src={calculatorIconPath} alt='calculator icon' />,
	// INVEST: <img src={investIconPath} alt='invest icon' />,
	// TRACKER: <img src={trackerIconPath} alt='tracker icon' />,
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
	// search: <MagnifyingGlassIcon className='h-4 w-4' />,

	// user: <img src={userIconPath} alt='user icon' />,

	showPassword: EyeIcon,
	hidePassword: EyeOffIcon,

	createGoal: FolderPlus,
	fund: Plus,
	withdraw: ArrowDown,
	transfer: ArrowUpRight,

	transferTo: ArrowDown,

	x: X,
	check: CheckIcon,

	success: CheckIcon,
	error: X,

	backButton: ArrowLeft,

	selectChevron: ChevronDown,

	uploadImage: Camera,

	trendUp: TrendingUp,

	edit: EditRoundedIcon,
	calendar: Calendar,

	search: Search,
} as const;

export type IconType = keyof typeof ICON_MAP;
