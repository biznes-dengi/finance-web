import {useState} from 'react';

import {Item} from '@shared/ui/Item.tsx';
import {Icon} from '@shared/ui/Icon.tsx';
import {Dialog} from '@shared/ui/Dialog.tsx';

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
				<div className='ml-1 h-4 w-4'>{Icon.chevronDown}</div>
			</div>

			<Dialog onClose={closeDialog} isDialogOpen={isDialogOpen}>
				{options.map((option, index) => (
					<Item
						key={index}
						checked={value === option.value}
						name={option.name}
						onClick={() => {
							closeDialog();
							setTimeout(() => onChange(option.value), 150);
						}}
						isNameText
					/>
				))}
			</Dialog>
		</>
	);
}
