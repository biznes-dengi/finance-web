import {useState} from 'react';

import {Item} from '@shared/ui/Item.tsx';
import {Icon} from '@shared/ui/Icon.tsx';
import {Dialog} from '@shared/ui/Dialog.tsx';
import {List} from '@shared/ui/List.tsx';

type Props<TValue> = {
	value: TValue;
	onChange: (value: TValue) => void;
	options: readonly {name: string; value: TValue}[];
};

export function SelectInCard<TValue>(props: Props<TValue>) {
	const {value, onChange, options} = props;

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	function openDialog() {
		setIsDialogOpen(true);
	}

	function closeDialog() {
		setIsDialogOpen(false);
	}

	return (
		<>
			<div
				className='flex w-fit cursor-pointer items-center text-sm font-medium text-primary-grey hover:text-black'
				onClick={openDialog}
			>
				{options.find((option) => option.value === value)?.name}
				<div className='ml-1 size-4'>{Icon.chevronDown}</div>
			</div>

			<Dialog onClose={closeDialog} isOpen={isDialogOpen}>
				<List
					rows={options}
					renderRow={(option) => (
						<Item
							checked={value === option.value}
							name={option.name}
							onClick={() => {
								closeDialog();
								setTimeout(() => onChange(option.value), 200);
							}}
							isNameText
						/>
					)}
				/>
			</Dialog>
		</>
	);
}
