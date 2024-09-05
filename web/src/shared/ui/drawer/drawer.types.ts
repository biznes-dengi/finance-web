import {ReactNode} from 'react';
import {DrawerProps as BottomDrawerProps} from '@shared/ui/drawer/ui/Drawer.tsx';

export type RightDrawerWrapperProps = {
	children: ReactNode;
};

export type DrawerWrapperPropsMap = {
	right: RightDrawerWrapperProps;
	bottom: BottomDrawerProps;
	left: never;
};

export type DrawerType = 'right' | 'bottom' | 'left';

export type DrawerWrapperProps<T extends DrawerType> = T extends keyof DrawerWrapperPropsMap
	? DrawerWrapperPropsMap[T]
	: never;
