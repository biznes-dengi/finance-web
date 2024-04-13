import {ReactNode, useRef} from 'react';

import {BottomDrawer} from './BottomDrawer.tsx';

export type DrawerProps = {
	content: ReactNode;
	afterAutoCloseAction?: () => void;
	closeDisabled?: boolean;
};

export function useDrawer() {
	const openDrawerRef = useRef<() => void>(() => {});
	const closeDrawerRef = useRef<() => void>(() => {});

	return {
		Drawer: (props: DrawerProps) => <BottomDrawer {...{openDrawerRef, closeDrawerRef}} {...props} />,
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
