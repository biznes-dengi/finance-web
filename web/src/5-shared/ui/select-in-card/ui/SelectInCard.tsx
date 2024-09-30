import {Item, Icon, List, Dialog} from '@shared/ui';
import {styleElement, useDialogState} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';
import {Props} from '../types/SelectInCard.types.ts';

export function SelectInCard<TValue>(props: Props<TValue>) {
	const {value, onChange, options} = props;

	const {dialogRef, openDialog, closeDialog} = useDialogState();

	return (
		<>
			<div
				className='flex w-fit cursor-pointer items-center text-sm font-medium text-primary-grey hover:cursor-pointer'
				onClick={() => openDialog()}
			>
				{options.find((option) => option.value === value)?.name}
				<div className='ml-1 size-4'>{Icon.chevronDown}</div>
			</div>

			<Dialog ref={dialogRef} title={APP_TEXT.savings}>
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
								rightNode={checked && styleElement(Icon.check, 'size-5 text-primary-violet flex self-center')}
								className={checked && 'bg-light-grey'}
								isNameText
							/>
						);
					}}
				/>
			</Dialog>
		</>
	);
}
