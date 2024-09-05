import {ReactElement, useRef} from 'react';

import {Drawer, type DrawerProps as BottomDrawerProps} from './ui/Drawer.tsx';
import {SuccessDrawerContent} from './ui/SuccessDrawerContent.tsx';
import {DrawerType, DrawerWrapperProps, RightDrawerWrapperProps} from './drawer.types.ts';

export function useDrawer<T extends DrawerType>(drawerType: T = 'bottom' as T) {
	const openDrawerRef = useRef<() => void>(() => {});
	const closeDrawerRef = useRef<() => void>(() => {});

	const DrawerWrapper = {
		right: (props: RightDrawerWrapperProps) => (
			<Drawer {...{openDrawerRef, closeDrawerRef}} {...props} direction='right' withOverlay={false} isFullScreen />
		),
		bottom: (props: BottomDrawerProps) => <Drawer {...{openDrawerRef, closeDrawerRef}} {...props} />,
		left: () => null,
	}[drawerType] as (props: DrawerWrapperProps<T>) => ReactElement;

	return {
		Drawer: DrawerWrapper,
		SuccessDrawerContent,
		openDrawer: () => openDrawerRef.current(),
		closeDrawer: () => closeDrawerRef.current(),
	};
}
