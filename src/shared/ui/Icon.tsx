import {
	ArrowRightIcon,
	BriefcaseIcon,
	EllipsisVerticalIcon,
	FolderPlusIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

import {cn} from '@shared/lib';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import userIconPath from '@shared/assets/user.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pyramidIconPath from '@shared/assets/pyramid.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import homeIconPath from '@shared/assets/home-primary-violet.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import calculatorIconPath from '@shared/assets/calculator.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import trackerIconPath from '@shared/assets/tracker.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import investIconPath from '@shared/assets/invest.svg';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';

export const APP_ICON = {
	USER: <img src={userIconPath} alt='user icon' />,
	APP_LOGO: <img src={pyramidIconPath} alt='pyramid icon' />,
	PORTFOLIO: <BriefcaseIcon className={cn('h-6 w-6 text-primary-grey')} />,
	HOME: <img src={homeIconPath} alt='home icon' />,
	CALCULATOR: <img src={calculatorIconPath} alt='calculator icon' />,
	INVEST: <img src={investIconPath} alt='invest icon' />,
	TRACKER: <img src={trackerIconPath} alt='tracket icon' />,
	createGoal: <FolderPlusIcon className={cn('h-6 w-6 text-primary-violet')} />,
	fund: <PlusIcon className={cn('h-6 w-6 text-primary-violet')} />,
	move: <ArrowRightIcon className={cn('h-6 w-6 text-primary-violet')} />,
	more: <EllipsisVerticalIcon className={cn('h-6 w-6 text-primary-violet')} />,
	backButton: <ArrowLeftIcon className={cn('h-6 w-6 text-primary-violet')} />,
};
