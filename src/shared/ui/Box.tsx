import {ReactNode} from 'react';
import {cn} from '@shared/lib';

type Props = {
	children: ReactNode;
	type?: 'subtitle' | 'title';
	isMainTitle?: unknown;
};

export function Box(props: Props) {
	const {children, type, isMainTitle} = props;

	if (type === 'title') {
		return <div className={cn('mb-1 font-semibold', !!isMainTitle && 'text-2xl')}>{children}</div>;
	}

	if (type === 'subtitle') {
		return <div className={cn('text-sm font-light text-primary-grey')}>{children}</div>;
	}

	return <div>{children}</div>;
}
