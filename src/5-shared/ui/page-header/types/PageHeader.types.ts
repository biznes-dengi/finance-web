import {ReactNode} from 'react';

export type PageHeaderProps = {
	appleTitle?: string;
	title?: string;
	description?: ReactNode;
	subDescription?: ReactNode;
	backPath?: string;
	handleBackButtonClick?: () => void;
	withBackButton?: boolean;
	className?: string;
	stepsCount?: number;
	activeStepIndex?: number;
};
