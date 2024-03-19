import {cn} from '@shared/lib';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import style from './Button.module.css';
import {APP_ICON, Icon} from '@shared/ui';

export enum BUTTON_TYPE {
	circle = 'circle',
	block = 'block',
}

type Props = {
	children: string;
	onClick?: (...args: unknown[]) => void;
	type?: BUTTON_TYPE;
	icon?: (typeof APP_ICON)[keyof typeof APP_ICON];
};

export function Button(props: Props) {
	const {children, onClick, type = BUTTON_TYPE.block, icon} = props;

	if (type === BUTTON_TYPE.circle && icon) {
		return (
			<div className='flex flex-col items-center'>
				<div className='flex h-10 w-10 items-center justify-center rounded-full bg-secondary-violet text-primary-violet'>
					<Icon name={icon} />
				</div>
				<div className='mt-1 text-primary-violet'>{children}</div>
			</div>
		);
	}

	return (
		<div role='button' className={cn(style.button, 'pointer rounded-2xl p-4')} onClick={onClick}>
			{children}
		</div>
	);
}
