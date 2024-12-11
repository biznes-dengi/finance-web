import {useParams} from 'react-router-dom';
import {getGoalProgressData} from '../../lib/goal.lib.ts';
import {GoalModel} from '@entities/goal';
import {Card, Icon, LoadingWrapper, StatusPopup} from '@shared/ui';
import {cn, DateService} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

export function GoalProgress() {
	const {id} = useParams();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {percentage, ratio, isCompleted} = getGoalProgressData(isGoalDetailsLoading, goalDetails) || {};

	return (
		<Card>
			<div className='p-4'>
				<div className='flex justify-between text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium'>
							{APP_TEXT.saved} {percentage}%
						</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div>{ratio}</div>
					</LoadingWrapper>
				</div>

				<div className='mt-4'>
					{isGoalDetailsLoading ? (
						<LoadingWrapper isLoading={isGoalDetailsLoading} className='h-1 rounded-2xl' />
					) : (
						<div className='relative h-1 w-full rounded-2xl bg-secondary-grey'>
							<div
								className={cn('h-1 rounded-2xl bg-primary-violet', isCompleted && 'bg-green-600')}
								style={{width: `${percentage}%`}}
							/>
							{isCompleted && (
								<div className='absolute -top-2 right-0 flex size-5 items-center justify-center rounded-full bg-green-600 text-white'>
									<Icon type='check' className='size-3' />
								</div>
							)}
						</div>
					)}
				</div>

				<div className='flex justify-between pt-4 text-sm text-primary-grey'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div>
							{goalDetails?.deadline &&
								`${APP_TEXT.deadline}: ${new DateService(goalDetails.deadline).getLocalDateString()}`}
						</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div>
							{goalDetails?.deadline &&
								`${APP_TEXT.left}: ${new DateService(goalDetails.deadline).calculateDaysLeft()}`}
						</div>
					</LoadingWrapper>
				</div>
			</div>

			<StatusPopup
				isOpen={!!isCompleted}
				status='congratulations'
				statusTextKey='goalAchieved'
				withDuration={false}
				yesButtonText={APP_TEXT.kaif}
			/>
		</Card>
	);
}
