import {AppIcon, Box, Card} from '@shared/ui';
import {CURRENCY} from '@shared/constants';
import {cn, DateService, textHelpers} from '@shared/lib';

export function SavingProgress({
	balance,
	targetAmount,
	deadline,
}: {
	targetAmount: number;
	balance: {amount: number; currency: CURRENCY};
	deadline: any;
}) {
	const percentage = Math.min(100, Math.floor((balance.amount / targetAmount) * 100));

	const isCompleted = percentage === 100;
	const isCompletedColorGreen = isCompleted && true;

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
					<div className='relative h-1 w-full rounded-2xl bg-secondary-grey'>
						<div
							className={cn('h-1 rounded-2xl bg-primary-violet', isCompletedColorGreen && 'bg-green-600')}
							style={{width: `${percentage}%`}}
						/>
						{isCompleted && (
							<div
								className={cn(
									'absolute -top-2 right-0 flex size-5 items-center justify-center rounded-full bg-primary-violet text-white',
									isCompletedColorGreen && 'bg-green-600',
								)}
							>
								<AppIcon type='check' className='size-3.5' />
							</div>
						)}
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
