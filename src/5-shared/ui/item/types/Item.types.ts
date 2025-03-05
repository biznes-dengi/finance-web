import {ReactElement, ReactNode} from 'react';
import {NavigateFunction} from 'react-router-dom';

export type ItemProps = {
	image?: ReactElement;
	imageIcon?: ReactElement | boolean;
	name: ReactNode;
	description?: ReactNode;
	rightName?: ReactNode;
	rightDescription?: ReactNode;
	isNameText?: boolean;
	leftNode?: ReactNode;
	rightNode?: ReactNode;
	onClick?: ({navigate}: {navigate: NavigateFunction}) => void;
	className?: string | boolean;
	isSingle?: boolean;
};
