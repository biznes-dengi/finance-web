import {useRef} from 'react';

import {Drawer, type DrawerWrapperProps} from './ui/Drawer.tsx';
import {SuccessDrawerContent} from './ui/SuccessDrawerContent.tsx';

export type useDrawerProps = {
	direction?: 'right';
	withOverlay?: boolean;
};

export function useDrawer(props: useDrawerProps = {}) {
	const {direction, withOverlay} = props;

	const openDrawerRef = useRef<() => void>(() => {});
	const closeDrawerRef = useRef<() => void>(() => {});

	return {
		Drawer: (props: DrawerWrapperProps) => (
			<Drawer {...{openDrawerRef, closeDrawerRef, direction, withOverlay}} {...props} />
		),
		SuccessDrawerContent,
		openDrawer: () => openDrawerRef.current(),
		closeDrawer: () => closeDrawerRef.current(),
	};
}
