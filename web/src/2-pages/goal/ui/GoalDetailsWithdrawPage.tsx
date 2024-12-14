import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {AmountField, Box, Button, ButtonType, DatePicker, PageHeader, StatusPopup} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';
import {DateService, isNumber, TextHelpers} from '@shared/lib';

export function GoalDetailsWithdrawPage() {
	const {id} = useParams();

	const {goalDetails} = GoalModel.useItemDetails({id});
	const {withdrawGoal, isWithdrawGoalLoading, isWithdrawGoalSuccess, isWithdrawGoalError} = GoalModel.useWithdraw();

	const [activeOption, setActiveOption] = useState<{id?: number; name: string; amount: number; currency: CURRENCY}>();

	const [amount, setAmount] = useState<string>('');
	const [date, setDate] = useState<Date>(new DateService().value);

	useEffect(() => {
		if (!goalDetails) return;

		const activeOption = {
			id: goalDetails.id,
			name: goalDetails.name,
			amount: goalDetails.balance.amount,
			currency: goalDetails.balance.currency,
		};

		setActiveOption(activeOption);
	}, [goalDetails]);

	function handleWithdrawClick() {
		if (!activeOption?.id) return;

		withdrawGoal({
			params: {
				id: activeOption.id,
			},
			payload: {
				amount: Number(amount),
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	const showAmountValidation = activeOption && isNumber(amount) && amount > activeOption.amount;

	return (
		<>
			<PageHeader title={APP_TEXT.withdraw} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<Box className='flex-1' basePaddingX>
				<AmountField
					value={amount}
					onChange={setAmount}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
					errorText={showAmountValidation && 'exceeds balance'}
					withMinus
				/>
				<Box baseMarginY>
					<DatePicker value={date} onChange={setDate} />
				</Box>
			</Box>

			{activeOption && (
				<StatusPopup
					isOpen={isWithdrawGoalSuccess}
					status='success'
					statusTextKey='withdrawGoalSuccess'
					statusTextProps={{
						goalName: activeOption.name,
						amount: `${TextHelpers.getAmountWithCurrency(amount, activeOption.currency)}`,
					}}
				/>
			)}
			{activeOption && (
				<StatusPopup
					isOpen={isWithdrawGoalError}
					status='error'
					statusTextKey='withdrawGoalError'
					statusTextProps={{goalName: activeOption.name}}
				/>
			)}

			<Box basePadding>
				<Button
					type={ButtonType.main}
					onClick={handleWithdrawClick}
					disabled={!amount}
					isLoading={isWithdrawGoalLoading}
				>
					{APP_TEXT.withdraw}
				</Button>
			</Box>
		</>
	);
}
