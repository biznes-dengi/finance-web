import {useParams} from 'react-router-dom';
import {getButtonConfigs} from '../config/GoalImage.config.tsx';
import {goalsDefaultFilter} from '@widgets/goal/util';
import {GoalModel} from '@entities/goal';
import {Button, LoadingWrapper, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';
import {TextHelpers, useFilter} from '@shared/lib';

export function GoalImage() {
	const {id} = useParams();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	const {filter} = useFilter<typeof goalsDefaultFilter>({defaultFilter: goalsDefaultFilter});
	const {goals, isGoalsLoading} = GoalModel.useItems({filter});

	const isLoading = isGoalsLoading || isGoalDetailsLoading;

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

			<div className='flex justify-between px-4 py-2'>
				{getButtonConfigs(id).map(({name, ...restButtonConfig}, index) => (
					<Button
						key={index}
						isLoading={isLoading}
						disabled={name === APP_TEXT.transfer && goals?.length <= 1}
						{...restButtonConfig}
					>
						{name}
					</Button>
				))}
			</div>
		</div>
	);
}
