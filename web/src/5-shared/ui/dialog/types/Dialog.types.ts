import {ReactNode} from 'react';

export type DrawerRef = {
	openDrawer: () => void;
	closeDrawer: () => void;
};

export type DrawerProps = {
	title?: ReactNode;
	children: ReactNode;
	showUX?: boolean;
	progress?: number;
};
