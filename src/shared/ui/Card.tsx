import {ReactNode} from 'react';

import {cn} from '@shared/lib';

type Props = {
	children: ReactNode;
	className?: string;
	withoutTopRounded?: boolean;
	withoutBottomRounded?: boolean;
	withBaseHorizontal?: boolean;
};

/**
 * я карточка, рендерю какой-то тайтл слева, какую-то иконку справа, какие-то кнопки снизу и какие-то list-items
 * add prop featureConfig -> map -> <button />
 */

export function Card(props: Props) {
	const {children, className, withoutTopRounded, withoutBottomRounded, withBaseHorizontal} = props;

	return (
		<div
			role='card-wrapper'
			className={cn(
				'rounded-2xl bg-white',
				withoutTopRounded && 'rounded-tl-none rounded-tr-none',
				withoutBottomRounded && 'rounded-bl-none rounded-br-none',
				withBaseHorizontal && 'px-4',
				className,
			)}
		>
			{children}
		</div>
	);
}
