import {useNavigate} from 'react-router-dom';
import {ItemProps} from '../types/Item.types.ts';
import {cn, isBoolean, styleElement, useResponsive} from '@shared/lib';

//if leftNode or rightNode is an icon => size-5

export function Item(props: ItemProps) {
	const {
		image,
		imageIcon,
		name,
		description,
		rightName,
		rightDescription,
		isNameText,
		leftNode,
		rightNode,
		onClick,
		className,
		isSingle,
	} = props;

	const navigate = useNavigate();

	const {isDesktop} = useResponsive();

	return (
		<div
			className={cn(
				'group rounded-2xl bg-white p-1',
				!isSingle && '[&:not(:last-child)]:pb-0',
				onClick && 'cursor-pointer',
			)}
			onClick={() => onClick?.({navigate})}
		>
			<div
				className={cn(
					'flex w-full rounded-2xl p-3 text-left duration-300',
					onClick && (isDesktop ? 'group-hover:bg-light-grey' : 'group-active:bg-light-grey'),
					className,
				)}
			>
				{leftNode && <div className='mr-4 flex flex-shrink-0 items-center'>{leftNode}</div>}

				{image && (
					<div className='relative my-0.5 mr-4 flex-shrink-0'>
						{image}

						{imageIcon && (
							<div className='absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary-violet text-white shadow-[0_0_0_2px_white_inset]'>
								{isBoolean(imageIcon) ? null : styleElement(imageIcon, 'size-[10px]')}
							</div>
						)}
					</div>
				)}

				<div className='min-w-0 flex-1 self-center'>
					<div className={cn('truncate font-medium', isNameText && 'font-normal')}>{name}</div>
					{description && <div className='truncate text-sm font-light text-primary-grey'>{description}</div>}
				</div>

				{(rightName || rightDescription) && (
					<div
						className={cn('ml-2 flex flex-shrink-0 flex-col items-end', description ? 'self-stretch' : 'self-center')}
					>
						{rightName && <div>{rightName}</div>}
						{rightDescription && <div className='text-sm font-light text-primary-grey'>{rightDescription}</div>}
					</div>
				)}

				{rightNode && <div className='ml-2 flex-shrink-0 self-center'>{rightNode}</div>}
			</div>
		</div>
	);
}
