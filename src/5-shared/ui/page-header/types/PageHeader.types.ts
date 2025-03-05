import {ReactElement, ReactNode} from 'react';
import type {ButtonConfig} from '@shared/ui';

export type PageHeaderProps = {
	title?: string;
	image?: ReactElement;
	description?: ReactNode;
	subDescription?: ReactNode;
	backPath?: string;
	handleBackButtonClick?: () => void;
	withBackButton?: boolean;
	stepsCount?: number;
	activeStepIndex?: number;
	className?: string;
	buttonConfigs?: ButtonConfig[];
	isLoading?: boolean;

	withNoSpace?: boolean;

	// appleTitle?: string;
};
