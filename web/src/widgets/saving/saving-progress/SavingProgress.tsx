import {Box} from '@shared/ui';

/** Not dumb component, bc there is no such pattern in the system */

export function SavingProgress() {
	// TODO: data fetching

	return (
		<Box isCard>
			<Box withBaseHorizontal withBaseVertical>
				<Box>
					<div className='flex justify-between'>
						<div className='text-sm font-medium'>Saved 50%</div>
						<div className='text-sm'>12 500 / 25 000 $</div>
					</div>
				</Box>
				<Box withBaseTop>
					<div className='h-1 w-full rounded-2xl bg-primary-grey' />
				</Box>
				<div className='flex justify-between pt-4'>
					<div className='text-sm text-primary-grey'>Deadline: 15 june 2024</div>
					<div className='text-sm text-primary-grey'>127d left</div>
				</div>
			</Box>
		</Box>
	);
}
