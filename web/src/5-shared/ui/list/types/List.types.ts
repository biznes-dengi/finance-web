import {ReactNode} from 'react';

export type Props<R> = {
	rows?: readonly R[];
	renderRow: (row: R, index: number) => ReactNode;
	isFetching?: boolean;
};
