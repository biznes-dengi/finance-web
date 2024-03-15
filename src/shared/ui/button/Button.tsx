import {cn} from '@shared/helpers';
// @ts-ignore
import style from './Button.module.css';

type Props = {
	children: string;
	onClick?: (...args: unknown[]) => void;
};

export function Button(props: Props) {
	const {children, onClick} = props;

	return (
		<div role='button' className={cn(style.button, 'pointer rounded-2xl p-4')} onClick={onClick}>
			{children}
		</div>
	);
}
