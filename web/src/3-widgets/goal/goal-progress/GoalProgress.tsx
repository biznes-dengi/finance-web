import {useParams} from 'react-router-dom';
import {Box, Card, Icon} from '@shared/ui';
import {cn, DateService, textHelpers} from '@shared/lib';
import {GoalModel} from '@entities/goal';

export function GoalProgress() {
	const {goalId} = useParams();
	const {itemDetails} = GoalModel.useItemDetails({id: Number(goalId)});

	if (!itemDetails) return null;

	const {balance, deadline} = itemDetails;

	//TODO
	const targetAmount = 1000000;

	const percentage = Math.min(100, Math.floor((balance.amount / targetAmount) * 100));
	const ratio = textHelpers.getRatio(balance.amount, targetAmount, balance.currency);
	const isCompleted = percentage === 100;

	return (
		<Card>
			<Box basePadding>
				<Box>
					<div className='flex justify-between'>
						<div className='text-sm font-medium'>Saved {percentage}%</div>
						<div className='text-sm'>{ratio}</div>
					</div>
				</Box>
				<Box baseMarginTop>
					<div className='relative h-1 w-full rounded-2xl bg-secondary-grey'>
						<div
							className={cn('h-1 rounded-2xl bg-primary-violet', isCompleted && 'bg-green-600')}
							style={{width: `${percentage}%`}}
						/>
						{isCompleted && (
							<div className='absolute -top-2 right-0 flex size-5 items-center justify-center rounded-full bg-green-600 text-white'>
								<Icon type='check' className='size-3.5' />
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
