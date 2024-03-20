import {NavigateFunction} from 'react-router/dist/lib/hooks';

import {type Icon} from '@shared/ui';

export type ButtonOnClick = ({navigate}: {navigate: NavigateFunction}) => void;

export type ButtonConfig = {
	name: string;
	icon: Icon;
	onClick: ButtonOnClick;
};
