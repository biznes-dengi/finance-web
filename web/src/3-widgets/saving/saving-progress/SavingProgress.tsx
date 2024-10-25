import {Box, Card} from '@shared/ui';
import {CURRENCY} from '@shared/constants';
import {DateService, textHelpers} from '@shared/lib';

export function SavingProgress({
	balance,
	targetAmount,
	deadline,
}: {
	targetAmount: number;
	balance: {amount: number; currency: CURRENCY};
	deadline: any;
}) {
	const percentage = Math.min(100, Math.round((balance.amount / targetAmount) * 100));

	return (
		<Card title={'Achievement'} withTitleSpace>
			<Box basePadding>
				<Box>
					<div className='flex justify-between'>
						<div className='text-sm font-medium'>Saved {percentage}%</div>
						<div className='text-sm'>{textHelpers.getRatio(balance.amount, targetAmount, balance.currency)}</div>
					</div>
				</Box>
				<Box baseMarginTop>
					<div className='h-1 w-full rounded-2xl bg-secondary-grey'>
						<div className='h-1 rounded-2xl bg-primary-violet' style={{width: `${percentage}%`}} />
					</div>
				</Box>

				{deadline && (
					<div className='flex justify-between pt-4'>
						<div className='text-sm text-primary-grey'>
							Deadline: {new DateService(new Date(deadline)).getLocalDateString()}
						</div>
						<div className='text-sm text-primary-grey'>127d left</div>
					</div>
				)}
			</Box>
		</Card>
	);
}
