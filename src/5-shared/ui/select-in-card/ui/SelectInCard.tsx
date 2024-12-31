import {Icon, Item, List, Popup, PreloadSkeleton, usePopupState} from '@shared/ui';
import {SelectInCardProps} from '../types/SelectInCard.types.ts';
import {cn, useResponsive} from '@shared/lib';

export function SelectInCard<TValue>(props: SelectInCardProps<TValue>) {
	const {value, onChange, options, isLoading, title} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	const {isDesktop} = useResponsive();

	if (isLoading) {
		return <PreloadSkeleton className='my-0.5 h-4 w-10' />;
	}

	return (
		<>
			<div
				className={cn(
					'flex w-fit cursor-pointer items-center text-sm font-medium text-primary-grey',
					isDesktop && 'hover:cursor-pointer',
				)}
				onClick={openPopup}
			>
				{options.find((option) => option.value === value)?.name + ' ' + title.toLowerCase()}
				<div className='ml-2'>
					<Icon type='selectChevron' className='size-2.5' />
				</div>
			</div>

			<Popup {...popupProps} title={title}>
				<List
					items={options}
					renderItem={(option) => {
						const checked = value === option.value;
						return (
							<Item
								name={option.name}
								onClick={() => {
									closePopup();
									setTimeout(() => onChange(option.value), 200);
								}}
								rightNode={checked && <Icon type='check' className='flex size-4 self-center text-primary-violet' />}
								className={checked && 'bg-light-grey'}
								isNameText
							/>
						);
					}}
				/>
			</Popup>
		</>
	);
}
