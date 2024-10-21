import {SavingProgress} from '@widgets/saving';
import {Box, Button, ButtonConfig, ButtonType, Card, Icon, Item, List, PageHeader} from '@shared/ui';

import {APP_PATH, APP_TEXT} from '@shared/constants';
import {useParams} from 'react-router-dom';
import {goalModel, TRANSACTION_ENUM} from '@entities/goal';
import {
	getGoalDetailsEditPath,
	getGoalDetailsFundPath,
	getGoalDetailsWithdrawPath,
} from '@shared/constants/appPath.constant.ts';

export function GoalDetailsPage() {
	const {goalId} = useParams();
	const data = goalModel.useDetails(goalId);
	const {items, isItemsLoading} = goalModel.useGoalTransactions(goalId);

	const buttonConfigs = [
		// {
		// 	name: APP_TEXT.fund,
		// 	icon: Icon.fund,
		// 	onClick: ({navigate}) => navigate(getGoalDetailsFundPath(goalId)),
		// },
		// {
		// 	name: APP_TEXT.withdraw,
		// 	icon: Icon.withdraw,
		// 	onClick: ({navigate}) => navigate(getGoalDetailsWithdrawPath(goalId)),
		// },
		{
			name: APP_TEXT.edit,
			icon: Icon.edit,
			onClick: ({navigate}) => navigate(getGoalDetailsEditPath(goalId)),
		},
	] as ButtonConfig[];

	return (
		<>
			<Box className='flex h-[290px] flex-col justify-between bg-secondary-grey'>
				<PageHeader title={data?.name} backPath={APP_PATH.root} />

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

			<Box basePaddingX className='mb-6 mt-4'>
				{data && <SavingProgress targetAmount={data.targetAmount} balance={data.balance} deadline={data.deadline} />}

				<Card
					title={APP_TEXT.transactions}
					// titleButton={<Button onClick={() => alert('seeAll')}>{APP_TEXT.seeAll}</Button>}
				>
					<List
						isFetching={isItemsLoading}
						rows={items}
						renderRow={(row) => (
							<Item
								image={<div className='size-10 rounded-full bg-secondary-violet' />}
								name={getTransactionName(row.type)}
								description={row.date}
								rightName={row.amount}
								onClick={() => {}}
							/>
						)}
					/>
				</Card>
			</Box>
		</>
	);
}

function getTransactionName(type: TRANSACTION_ENUM) {
	if (type === TRANSACTION_ENUM.DEPOSIT) {
		return 'Deposit';
	}
	if (type === TRANSACTION_ENUM.WITHDRAW) {
		return 'Withdraw';
	}
	if (type === TRANSACTION_ENUM.TRANSFER) {
		return 'Transfer';
	}
}
