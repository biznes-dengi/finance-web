import {useRef} from 'react';
import {DrawerRef} from '@shared/ui';

export function useDialogState() {
	const dialogRef = useRef<DrawerRef>(null);

	return {
		dialogRef,
		openDialog: () => dialogRef.current?.openDrawer(),
		closeDialog: () => dialogRef.current?.closeDrawer(),
	};
}
