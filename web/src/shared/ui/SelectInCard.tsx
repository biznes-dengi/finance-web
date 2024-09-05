import {useState} from 'react';
import Drawer from '@mui/material/Drawer';

import {Box} from '@shared/ui/Box.tsx';
import {Item} from '@shared/ui/Item.tsx';

type Value = string | null;

type Props = {
	value: Value;
	onChange: (value: Value) => void;
	options: {name: string; value: Value}[];
};

export function SelectInCard(props: Props) {
	const {value, onChange, options} = props;

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<>
			<span className='cursor-pointer text-sm text-primary-grey hover:text-black' onClick={() => setIsDrawerOpen(true)}>
				{options.find((option) => option.value === value)?.name} {'>'}
			</span>

			<Drawer anchor='bottom' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
				<div className='flex flex-col rounded-2xl px-6 py-3'>
					<div
						className='h-6 w-6 self-end rounded-full bg-secondary-grey text-center text-white'
						onClick={() => setIsDrawerOpen(false)}
					>
						<span className='text-primary-grey'>X</span>
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
