import {ReactNode} from 'react';
import {ClassValue} from 'clsx';

export type Props = {
	title?: ReactNode;
	rightTitle?: ReactNode;
	titleInCard?: ReactNode;
	children: ReactNode;
	withTitleSpace?: ClassValue;
};
