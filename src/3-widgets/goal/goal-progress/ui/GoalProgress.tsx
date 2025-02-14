import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {Button, ButtonType, Card, Icon, LoadingWrapper, Popup, usePopupState} from '@shared/ui';
import {cn, DateService, TextHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

export function GoalProgress() {
	const {id} = useParams();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {balance, targetAmount} = goalDetails || {};

	const {
		percentage = 0,
		ratio = 0,
		isCompleted = false,
	} = (() => {
		if (!balance || !targetAmount) return {};

		const percentage = Math.min(100, Math.floor((balance!.amount / (targetAmount as number)) * 100));
		const isCompleted = balance.amount >= targetAmount;

		const ratio = TextHelpers.getRatio(balance!.amount, targetAmount as number, balance?.currency);

		return {percentage, ratio, isCompleted};
	})();

	const {popupProps, closePopup} = usePopupState({initialState: isCompleted});

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

				<div className='flex justify-between gap-4 pt-4 text-sm text-primary-grey'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div>
							{goalDetails?.deadline &&
								`${APP_TEXT.deadline}: ${new DateService(goalDetails.deadline).getLocalDateString()}`}
						</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div>
							{goalDetails?.deadline && `${APP_TEXT.eshe} ${new DateService(goalDetails.deadline).calculateTimeLeft()}`}
						</div>
					</LoadingWrapper>
				</div>
			</div>

			<Popup {...popupProps}>
				<div className='flex flex-col items-center justify-center'>
					<Icon type='congratulations' className='my-2 text-3xl' />

					<div className='mb-3 text-center text-lg font-medium'>{APP_TEXT.congratulations}</div>

					<div className='mb-2'>
						Там, где другие сдавались, Вы проявили настойчивость и теперь{' '}
						<span className='font-medium text-primary-violet'>Вы можете осуществить свою мечту</span>.
					</div>
					<div>
						Мы гордимся Вами, желаем дальнейших успехов и пусть впереди будет еще больше целей, которые Вы легко
						достигнете!
					</div>

					<Button className='mt-4' type={ButtonType.main} onClick={closePopup}>
						{APP_TEXT.kaif}
					</Button>
				</div>
			</Popup>
		</Card>
	);
}
