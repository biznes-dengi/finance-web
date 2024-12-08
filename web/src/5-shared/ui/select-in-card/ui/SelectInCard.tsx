import {Item, Icon, List, Popup, PreloadSkeleton, usePopupState, AppIcon} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {Props} from '../types/SelectInCard.types.ts';

export function SelectInCard<TValue>(props: Props<TValue>) {
	const {value, onChange, options, isFetching} = props;

	const {dialogRef, openDialog, closeDialog} = usePopupState();

	if (isFetching) {
		return <PreloadSkeleton width={40} height={16} />;
	}

	return (
		<>
			<div className='flex w-fit cursor-pointer items-center hover:cursor-pointer' onClick={() => openDialog()}>
				{options.find((option) => option.value === value)?.name}
				<div className='ml-2 size-3'>{Icon.chevronDown}</div>
			</div>

			<Popup ref={dialogRef} title={APP_TEXT.savings}>
				<List
					rows={options}
					renderRow={(option) => {
						const checked = value === option.value;
						return (
							<Item
								name={option.name}
								onClick={() => {
									closeDialog();
									setTimeout(() => onChange(option.value), 200);
								}}
								rightNode={checked && <AppIcon type='check' className='flex size-5 self-center text-primary-violet' />}
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
