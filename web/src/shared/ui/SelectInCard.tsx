import {useState} from 'react';
import Drawer from '@mui/material/Drawer';

import {Box} from '@shared/ui/Box.tsx';
import {Item} from '@shared/ui/Item.tsx';
import {Icon} from '@shared/ui/Icon.tsx';

type Props<TValue> = {
	value: TValue;
	onChange: (value: TValue) => void;
	options: readonly {name: string; value: TValue}[];
};

export function SelectInCard<TValue>(props: Props<TValue>) {
	const {value, onChange, options} = props;

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<>
			<span
				className='cursor-pointer text-sm font-medium text-primary-grey hover:text-black'
				onClick={() => setIsDrawerOpen(true)}
			>
				{options.find((option) => option.value === value)?.name} {'>'}
			</span>

			<Drawer anchor='bottom' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
				<div className='flex flex-col rounded-2xl px-6 py-3'>
					<div
						className='flex h-6 w-6 items-center justify-center self-end rounded-full bg-secondary-grey text-center text-white'
						onClick={() => setIsDrawerOpen(false)}
					>
						<div className='h-4 w-4 text-primary-grey'>{Icon.x}</div>
					</div>

					<Box className='text-xl font-medium' baseMarginBottom>
						Savings
					</Box>

					{options.map((option, index) => (
						<Item
							key={index}
							isNameText
							checked={value === option.value}
							name={option.name}
							onClick={() => {
								setIsDrawerOpen(false);
								setTimeout(() => onChange(option.value), 150);
							}}
						/>
					))}
				</div>
			</Drawer>
		</>
	);
}
