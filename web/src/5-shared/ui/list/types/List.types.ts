import {ReactElement} from 'react';

export type Props<R> = {
	rows?: readonly R[];
	renderRow: (row: R, index: number) => ReactElement;
	isFetching?: boolean;
};
