import {ReactElement, ReactNode} from 'react';
import {NavigateFunction} from 'react-router-dom';

export type Props = {
	image?: ReactElement;
	statusIcon?: ReactNode;
	name: ReactNode;
	description?: ReactNode;
	rightName?: ReactNode;
	rightDescription?: ReactNode;
	isNameText?: boolean;
	leftNode?: ReactNode;
	rightNode?: ReactNode;
	onClick?: (navigate: NavigateFunction) => void;
	className?: string | boolean;
};
