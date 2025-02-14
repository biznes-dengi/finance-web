import {useParams} from 'react-router-dom';
import {getButtonConfigs} from '../config/GoalImage.config.tsx';
import {GoalModel} from '@entities/goal';
import {Button, LoadingWrapper, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';
import {TextHelpers} from '@shared/lib';

export function GoalImage() {
	const {id} = useParams();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {goals: allGoals, isGoalsLoading: isAllGoalsLoading} = GoalModel.useItems({queryKey: 'all'});

	const isLoading = isAllGoalsLoading || isGoalDetailsLoading;

	return (
		<div className='flex h-[310px] flex-col bg-secondary-grey'>
			<PageHeader backPath={APP_PATH.goalList} className='flex-grow' />

			<div className='flex flex-col gap-2 px-4 py-2'>
				<LoadingWrapper isLoading={isLoading} className='mb-5 h-6 w-14'>
					{goalDetails && (
						<>
							<div className='text text-sm'>{goalDetails.name}</div>
							<div className='text-3xl font-[600]'>
								{`${TextHelpers.getAmount(goalDetails.balance.amount)} ${
									CURRENCY_SYMBOL[goalDetails.balance.currency]
								}`}
							</div>
						</>
					)}
				</LoadingWrapper>
			</div>

			<div className='flex justify-between p-2'>
				{getButtonConfigs(id).map(({name, ...restButtonConfig}, index) => (
					<Button
						key={index}
						isLoading={isLoading}
						disabled={name === APP_TEXT.transfer && (allGoals?.length ? allGoals.length <= 1 : true)}
						{...restButtonConfig}
					>
						{name}
					</Button>
				))}
			</div>
		</div>
	);
}
