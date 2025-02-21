import {ReactElement, ReactNode} from 'react';
import {NavigateFunction} from 'react-router-dom';

export type ItemProps = {
	icon?: ReactNode;
	image?: ReactElement;
	imageIcon?: ReactNode;
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
