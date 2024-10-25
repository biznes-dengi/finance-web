import {ReactNode} from 'react';

export type TItemImageWithProgress = {
	image: ReactNode;
	current: number;
	target: number;
};
