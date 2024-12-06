import {useParams} from 'react-router-dom';
import {Box, Button, ButtonType, PageHeader} from '@shared/ui';
import {APP_PATH} from '@shared/constants';
import {GoalModel} from '@entities/goal';
import {getButtonConfigs} from '../lib/GoalImage.lib.tsx';

export function GoalImage() {
	const {goalId} = useParams();
	const {goalDetails} = GoalModel.useDetails(goalId);

	return (
		<Box className='flex h-[300px] flex-col justify-between bg-secondary-grey'>
			<PageHeader title={goalDetails?.name} backPath={APP_PATH.goalList} />

			<Box basePadding className='flex justify-between'>
				{getButtonConfigs(goalId).map((buttonConfig) => (
					<Button
						type={ButtonType.icon}
						key={buttonConfig.name}
						icon={buttonConfig.icon}
						onClick={buttonConfig.onClick}
					>
						{buttonConfig.name}
					</Button>
				))}
			</Box>
		</Box>
	);
}
