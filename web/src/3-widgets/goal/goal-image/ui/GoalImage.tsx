import {useParams} from 'react-router-dom';
import {getButtonConfigs} from '../config/GoalImage.config.tsx';
import {GoalModel} from '@entities/goal';
import {Button, ButtonType, LoadingWrapper, PageHeader} from '@shared/ui';
import {APP_PATH, CURRENCY_SYMBOL} from '@shared/constants';
import {TextHelpers} from '@shared/lib';

export function GoalImage() {
	const {id} = useParams();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});

	return (
		<div className='flex h-[310px] flex-col bg-secondary-grey'>
			<PageHeader backPath={APP_PATH.goalList} className='flex-grow' />

			<div className='flex flex-col gap-2 px-4 py-2'>
				<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-5 h-6 w-14'>
					{goalDetails && (
						<>
							<div className='text text-sm'>{goalDetails.name}</div>
							<div className='text-3xl font-medium'>
								{`${TextHelpers.getAmount(goalDetails.balance.amount)} ${
									CURRENCY_SYMBOL[goalDetails.balance.currency]
								}`}
							</div>
						</>
					)}
				</LoadingWrapper>
			</div>

			<div className='flex justify-between px-4 py-2'>
				{getButtonConfigs(id).map((buttonConfig) => (
					<Button
						type={ButtonType.icon}
						key={buttonConfig.name}
						icon={buttonConfig.icon}
						onClick={buttonConfig.onClick}
						isLoading={isGoalDetailsLoading}
					>
						{buttonConfig.name}
					</Button>
				))}
			</div>
		</div>
	);
}
