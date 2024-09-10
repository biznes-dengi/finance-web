import Drawer from '@mui/material/Drawer';
import {ReactNode} from 'react';

import {Icon} from '@shared/ui/Icon.tsx';
import {Box} from '@shared/ui/Box.tsx';

type Props = {
	isDialogOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export function Dialog(props: Props) {
	const {children, isDialogOpen, onClose} = props;

	return (
		<Drawer anchor='bottom' open={isDialogOpen} onClose={onClose} PaperProps={{className: 'rounded-t-2xl'}}>
			<Box className='flex flex-col px-6 py-4'>
				<Box className='flex items-center justify-between' baseMarginBottom>
					<div />
					<Box className='text-xl font-medium'>Savings</Box>
					<div
						className='flex h-6 w-6 items-center justify-center duration-300 hover:cursor-pointer hover:rounded-full hover:bg-secondary-grey'
						onClick={onClose}
					>
						<div className='h-5 w-5'>{Icon.x}</div>
					</div>
				</Box>

				{children}
			</Box>
		</Drawer>
	);
}
