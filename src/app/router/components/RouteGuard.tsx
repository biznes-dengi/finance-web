import {ReactNode} from 'react';

type Props = {
	element: ReactNode;
};

export function RouteGuard(props: Props) {
	const {element} = props;

	return element;
}
