import {ReactNode} from 'react';

export type PageHeaderProps = {
	className?: string;
	appleTitle?: string;
	title?: string;
	description?: ReactNode;
	subDescription?: ReactNode;
	backPath?: string;
	handleBackButtonClick?: () => void;
	withBackButton?: boolean;
	withNoSpace?: boolean;
	stepsCount?: number;
	activeStepIndex?: number;
};
