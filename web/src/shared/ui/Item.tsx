import {cloneElement, ReactElement, ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {Icon} from '@shared/ui';

import {cn} from '@shared/lib';

type Props = {
	name: ReactNode;
	description?: ReactNode;
	subDescription?: ReactNode;
	rightName?: ReactNode;
	rightDescription?: ReactNode;
	rightSubDescription?: ReactNode;
	isNameText?: boolean;

	icon?: ReactElement;
	statusIcon?: ReactElement;
	checked?: boolean;

	rightNode?: ReactElement;

	withChevron?: boolean;
	onClick?: (navigate: NavigateFunction) => void;
};

export function Item(props: Props) {
	const {
		name,
		description,
		subDescription,
		rightName,
		rightDescription,
		rightSubDescription,
		isNameText,

		icon,
		statusIcon,
		checked,

		rightNode,

		withChevron,
		onClick,
	} = props;

	const navigate = useNavigate();

	return (
		<div
			className={cn(
				'flex w-full rounded-2xl bg-white p-4 text-left duration-300 hover:bg-light-grey hover:shadow-[0_0_0_4px_white_inset]',
				// checked && 'bg-secondary-violet',
				withChevron && ' justify-between',
				onClick && 'cursor-pointer',
			)}
			onClick={() => onClick?.(navigate)}
		>
			{icon && (
				<div className='relative my-0.5 mr-4 h-10 w-10 flex-shrink-0'>
					{icon && cloneElement(icon, {style: {height: '100%', borderRadius: '50%'}})}

					{/*{(statusIcon || checked) && (*/}
					{/*	<div*/}
					{/*		className={cn(*/}
					{/*			'shadow-[0_0_0_2px_white_inset]',*/}
					{/*			'absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-violet text-white',*/}
					{/*		)}*/}
					{/*	>*/}
					{/*		<div className='h-3 w-3'>{statusIcon || Icon.check}</div>*/}
					{/*	</div>*/}
					{/*)}*/}
				</div>
			)}

			<div className={cn('min-w-0 flex-1 self-center')}>
				<div className={cn('truncate font-medium', isNameText && 'font-normal')}>{name}</div>
				{description && <div className='truncate text-sm font-light text-primary-grey'>{description}</div>}
				{subDescription && <div className='truncate text-sm font-light text-primary-grey'>{subDescription}</div>}
			</div>

			{(rightName || rightDescription || rightSubDescription) && (
				<div className={cn('ml-2 flex flex-shrink-0 flex-col items-end self-center', subDescription && 'self-stretch')}>
					{rightName && <div>{rightName}</div>}
					{rightDescription && <div className='text-sm font-light text-primary-grey'>{rightDescription}</div>}
					{rightSubDescription && <div className='text-sm font-light text-primary-grey'>{rightSubDescription}</div>}
				</div>
			)}

			{rightNode && <div className='ml-2 flex-shrink-0 self-center'>{rightNode}</div>}

			{withChevron &&
				cloneElement(Icon.rightChevron, {className: 'ml-2 w-4 h-4 flex-shrink-0 self-center text-primary-grey'})}
		</div>
	);
}
