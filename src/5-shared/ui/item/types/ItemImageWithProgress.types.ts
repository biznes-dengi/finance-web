import {ReactNode} from 'react';

export type ItemImageWithProgressProps = {
	image: ReactNode;
	current: number;
	target: number;
};
