import {ReactNode} from 'react';

export type LoadingWrapperProps = {
	isLoading: boolean;
	className: string;
	children?: ReactNode;
	loadingChildren?: ReactNode;
};
