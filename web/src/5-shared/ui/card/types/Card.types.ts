import {ReactNode} from 'react';

export type CardProps = {
	title?: ReactNode;
	rightTitle?: ReactNode;
	titleInCard?: ReactNode;
	children: ReactNode;
	isLoading?: boolean;
};

export type LinkTitleInCardProps = {
	title: ReactNode;
	path: string;
};
