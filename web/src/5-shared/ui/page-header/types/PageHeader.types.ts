import {ReactNode} from 'react';

export type PageHeaderProps = {
	title?: string;
	description?: ReactNode;
	subDescription?: ReactNode;
	backPath?: string;
	handleBackButtonClick?: () => void;
	withBackButton?: boolean;
};
