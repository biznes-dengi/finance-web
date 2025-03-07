import {ReactNode} from 'react';
import {cn} from '@shared/lib';

export function PageWidgetsWrapper({children, withTopSpace}: {children: ReactNode; withTopSpace?: boolean}) {
	// new styles: gap-6 pb-6 pt-6
	return <div className={cn('flex flex-col gap-4 px-4 pb-4', withTopSpace && 'pt-4')}>{children}</div>;
}
