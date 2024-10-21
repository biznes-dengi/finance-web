import {Box, Card} from '@shared/ui';
import {CURRENCY, CURRENCY_MAP} from '@shared/constants';

export function SavingProgress({
	balance,
	targetAmount,
	deadline,
}: {
	targetAmount: number;
	balance: {amount: number; currency: CURRENCY};
	deadline: any;
}) {
	const percentage = Math.round((balance.amount / targetAmount) * 100);

	return (
		<Card title={'Achievement'}>
			<Box basePadding>
				<Box>
					<div className='flex justify-between'>
						<div className='text-sm font-medium'>Saved {percentage}%</div>
						<div className='text-sm'>
							{balance.amount} / ${targetAmount} {CURRENCY_MAP[balance.currency].symbol}
						</div>
					</div>
				</Box>
				<Box baseMarginTop>
					<div className='h-1 w-full rounded-2xl bg-secondary-grey'>
						<div className='h-1 rounded-2xl bg-primary-violet' style={{width: `${percentage}%`}} />
					</div>
				</Box>

				{deadline && (
					<div className='flex justify-between pt-4'>
						<div className='text-sm text-primary-grey'>Deadline: 15 june 2024</div>
						<div className='text-sm text-primary-grey'>127d left</div>
					</div>
				)}
			</Box>
		</Card>
	);
}
