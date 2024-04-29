import {ReactNode, useRef} from 'react';

import {BottomDrawer} from './ui/BottomDrawer.tsx';
import {SuccessDrawerContent} from './ui/SuccessDrawerContent.tsx';

export type DrawerProps = {
	content: ReactNode;
	afterAutoCloseAction?: () => void;
	isCloseDisabled?: boolean;
};

export function useDrawer() {
	const openDrawerRef = useRef<() => void>(() => {});
	const closeDrawerRef = useRef<() => void>(() => {});

	return {
		Drawer: (props: DrawerProps) => <BottomDrawer {...{openDrawerRef, closeDrawerRef}} {...props} />,
		SuccessDrawerContent,
		openDrawer: () => openDrawerRef.current(),
		closeDrawer: () => closeDrawerRef.current(),
	};
}

/**
 * const Component = {
 *   [key]: BottomDrawer
 * }
 *
 * <Component />
 */
