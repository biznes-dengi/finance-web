import {useState} from 'react';
import {GoalModel} from '@entities/goal';
import {buttonConfigs} from '../config/PortfolioManagement.config.tsx';
import {Icon, Item, List, Management, Popup, PopupHelpers, usePopupState} from '@shared/ui';
import {cn, TextHelpers} from '@shared/lib';
import {APP_PATH, APP_TEXT, CURRENCY_SYMBOL} from '@shared/constants';

const options = [
	{name: '24h', value: 1},
	{name: '7d', value: 2},
	{name: '1m', value: 3},
	{name: '6m', value: 4},
	{name: '1y', value: 5},
	{name: 'All time', value: 6},
];

export function PortfolioManagement() {
	const {goalTotalBalance, isGoalTotalBalanceLoading} = GoalModel.useTotalBalance();
	const {goals, isGoalsLoading, hasNextGoalsPage, fetchNextGoalsPage} = GoalModel.useItems();

	const [timeframeConfig, setTimeframeConfig] = useState<{name: string; value: number}>(options[0]);

	const {popupProps, openPopup, closePopup} = usePopupState();

	const isLoading = isGoalTotalBalanceLoading || isGoalsLoading;

	return (
		<>
			<Management
				isLoading={isLoading}
				totalBalance={goalTotalBalance}
				totalBalanceDescription={
					<div className='flex items-center gap-1.5 text-red-600'>
						<div>-1 700$</div>
						<div className='size-0.5 rounded-full bg-red-600' />
						<div>30%</div>
					</div>
				}
				rightNode={
					<div
						className={cn(
							'flex items-center gap-1 rounded-2xl bg-light-grey p-2 text-sm transition duration-200',
							popupProps.isOpen && 'text-primary-grey',
						)}
						onClick={openPopup}
					>
						<div>{timeframeConfig.name}</div>
						<div>
							<Icon type='selectChevron' className='size-[10px]' />
						</div>
					</div>
				}
				buttonConfigs={buttonConfigs}
				listTitle={APP_TEXT.assets}
				listItems={goals}
				renderListItem={(goal) => (
					<Item
						image={<div className='size-10 rounded-full bg-green-200' />}
						imageIcon={<div className='size-2 bg-secondary-violet' />}
						name={goal.name}
						description='0.1354$'
						rightName={`${TextHelpers.getAmount(goal.balance.amount)} ${CURRENCY_SYMBOL[goal.balance.currency]}`}
						rightDescription={
							<div className='flex items-center gap-1.5 text-red-600'>
								<div>-1 700$</div>
								<div className='size-0.5 rounded-full bg-red-600' />
								<div>30%</div>
							</div>
						}
						onClick={({navigate}) => navigate(APP_PATH.goal.getItemDetailsPath(goal.id))}
					/>
				)}
				fetchNextListPage={fetchNextGoalsPage}
				hasNextListPage={hasNextGoalsPage}
				emptyListTextKey='assets'
			/>

			<Popup {...popupProps} title={APP_TEXT.period}>
				<List
					items={options}
					renderItem={(option) => {
						const checked = timeframeConfig.value === option.value;
						return (
							<Item
								name={option.name}
								onClick={() => {
									closePopup();
									PopupHelpers.runAfterPopupClosed(() => setTimeframeConfig(option));
								}}
								rightNode={checked && <Icon type='check' className='flex size-4 self-center text-primary-violet' />}
								className={checked && 'bg-light-grey'}
								isNameText
							/>
						);
					}}
				/>
			</Popup>
		</>
	);
}
