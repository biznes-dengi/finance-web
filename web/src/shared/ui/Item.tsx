import {cloneElement, ReactElement, ReactNode} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';

import {Icon} from '@shared/ui';

import {cn, isBoolean, styleElement} from '@shared/lib';

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
	withMultipleSelection?: boolean;

	added?: boolean;

	rightNode?: ReactElement;
	withChevron?: boolean;

	onClick?: (navigate: NavigateFunction) => void;
	isSingle?: boolean;
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
		withMultipleSelection,

		added,

		rightNode,
		withChevron,

		onClick,
		isSingle,
	} = props;

	const navigate = useNavigate();

	const showIconCheckmark = !withMultipleSelection && icon && checked;
	const showRightCheckmark = !withMultipleSelection && !icon && checked;

	return (
		<div
			className={cn(
				'flex w-full rounded-2xl bg-white p-4 text-left',
				isSingle ? 'shadow-[0_0_0_4px_white_inset]' : 'mb-1 last:mb-0',
				showIconCheckmark && 'bg-secondary-violet hover:bg-secondary-violet',
				onClick && 'cursor-pointer duration-300 hover:bg-light-grey',
			)}
			onClick={() => onClick?.(navigate)}
		>
			{withMultipleSelection && (
				<div className='mr-4 flex flex-shrink-0 items-center'>
					<input type='checkbox' checked={checked} className='h-5 w-5' />
				</div>
			)}

			{icon && (
				<div className='relative my-0.5 mr-4 h-10 w-10 flex-shrink-0'>
					{icon && cloneElement(icon, {style: {height: '100%', borderRadius: '50%'}})}

					{(showIconCheckmark || statusIcon) && (
						<div
							className={cn(
								'absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary-violet text-white',
								// 'shadow-[0_0_0_2px_white_inset]',
							)}
						>
							{styleElement(statusIcon || Icon.check, 'size-3.5')}
							{/* for shadow <div className='h-3 w-3'>{Icon.check}</div> */}
						</div>
					)}
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

			{showRightCheckmark && styleElement(Icon.check, 'size-5 text-primary-violet flex self-center')}

			{/** Is it used that often? rightNode handle next 2 cases */}

			{isBoolean(added) &&
				styleElement(
					added ? Icon.check : Icon.fund,
					cn('size-5 self-center', added ? 'text-primary-grey' : 'text-primary-violet'),
				)}

			{withChevron &&
				cloneElement(Icon.rightChevron, {className: 'ml-2 size-4 flex-shrink-0 self-center text-primary-grey'})}
		</div>
	);
}
