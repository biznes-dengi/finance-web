import {SavingProgress} from '@widgets/saving';
import {Box, Button, ButtonConfig, ButtonType, Card, Icon, Item, List, PageHeader} from '@shared/ui';

import {APP_PATH, APP_TEXT} from '@shared/constants';
import {useNavigate, useParams} from 'react-router-dom';
import {goalModel} from '@entities/goal';
import {
	getGoalDetailsEditPath,
	getGoalDetailsFundPath,
	getGoalDetailsTransferPath,
	getGoalDetailsWithdrawPath,
	getGoalTransactionsPath,
} from '@shared/constants/appPath.constant.ts';
import {getTransactionName, getTransactionRightName} from '@pages/goal/lib/goal.lib.ts';
import {DateService} from '@shared/lib';

export function GoalDetailsPage() {
	const navigate = useNavigate();
	const {goalId} = useParams();
	const {goalDetails: details} = goalModel.useDetails(goalId);
	const {items, isItemsLoading} = goalModel.useGoalTransactions(goalId);

	const buttonConfigs = [
		{
			name: APP_TEXT.edit,
			icon: Icon.edit,
			onClick: ({navigate}) => navigate(getGoalDetailsEditPath(goalId)),
		},
		{
			name: APP_TEXT.fund,
			icon: Icon.fund,
			onClick: ({navigate}) => navigate(getGoalDetailsFundPath(goalId)),
		},
		{
			name: APP_TEXT.withdraw,
			icon: Icon.withdraw,
			onClick: ({navigate}) => navigate(getGoalDetailsWithdrawPath(goalId)),
		},
		{
			name: APP_TEXT.transfer,
			icon: Icon.transfer,
			onClick: ({navigate}) => navigate(getGoalDetailsTransferPath(goalId)),
		},
	] as ButtonConfig[];

	return (
		<>
			<Box className='flex h-[290px] flex-col justify-between bg-secondary-grey'>
				<PageHeader title={details?.name} backPath={APP_PATH.root} />

				<Box basePadding className='flex justify-between'>
					{buttonConfigs.map((buttonConfig) => (
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

			<Box basePaddingX className='mb-6'>
				{details && details?.targetAmount && (
					<SavingProgress targetAmount={details.targetAmount} balance={details.balance} deadline={details.deadline} />
				)}

				<Card
					title={APP_TEXT.transactions}
					rightTitle={<Button onClick={() => navigate(getGoalTransactionsPath(goalId))}>{APP_TEXT.seeAll}</Button>}
					withTitleSpace
				>
					{items && (
						<List
							isFetching={isItemsLoading}
							rows={[items[0], items[1], items[2]]}
							renderRow={(row) => {
								if (!row) return null;
								return (
									<Item
										image={<div className='size-10 rounded-full bg-secondary-violet' />}
										name={getTransactionName(row)}
										description={new DateService(new Date(row.date as string)).getLocalDateString()}
										rightName={
											details &&
											getTransactionRightName(
												row.type,
												(row.amount ?? row.toGoalAmount) as number,
												details.balance.currency,
											)
										}
										// onClick={() => alert('go to transaction details')}
									/>
								);
							}}
						/>
					)}
				</Card>
			</Box>
		</>
	);
}
