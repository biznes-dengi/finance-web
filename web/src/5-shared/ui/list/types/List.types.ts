import {ReactElement} from 'react';

export type Props<R> = {
	rows?: readonly R[];
	renderRow: (row: R) => ReactElement;
	isFetching?: boolean;
};
