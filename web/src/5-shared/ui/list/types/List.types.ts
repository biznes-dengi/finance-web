import {ReactElement, ReactNode} from 'react';

export type Props<R> = {
	title?: ReactNode;
	titleButton?: ReactNode;
	rows: readonly R[];
	renderRow: (row: R) => ReactElement;
	isFetching?: boolean;
};
