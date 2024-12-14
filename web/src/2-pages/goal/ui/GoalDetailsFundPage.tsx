import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {AmountField, Box, Button, ButtonType, DatePicker, PageHeader, StatusPopup} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';
import {DateService, TextHelpers} from '@shared/lib';

export function GoalDetailsFundPage() {
	const {id} = useParams();

	const {goalDetails} = GoalModel.useItemDetails({id});
	const {fundGoal, isFundGoalLoading, isFundGoalSuccess, isFundGoalError} = GoalModel.useFund();

	const [activeOption, setActiveOption] = useState<{id?: number; name: string; amount: number; currency: CURRENCY}>();

	const [amount, setAmount] = useState<string>('');
	const [date, setDate] = useState<Date>(new DateService().value!);

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

	function handleFundClick() {
		if (!activeOption?.id) return;

		fundGoal({
			params: {
				id: activeOption.id,
			},
			payload: {
				amount: Number(amount),
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	return (
		<>
			<PageHeader title={APP_TEXT.fund} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<Box className='flex-1' basePaddingX>
				<AmountField
					value={amount}
					onChange={setAmount}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
					withPlus
				/>
				<Box baseMarginY>
					<DatePicker value={date} onChange={setDate} />
				</Box>
			</Box>

			{activeOption && (
				<StatusPopup
					isOpen={isFundGoalSuccess}
					status='success'
					statusTextKey='fundGoalSuccess'
					statusTextProps={{
						goalName: activeOption.name,
						amount: `${TextHelpers.getAmountWithCurrency(amount, activeOption.currency)}`,
					}}
				/>
			)}
			{activeOption && (
				<StatusPopup
					isOpen={isFundGoalError}
					status='error'
					statusTextKey='fundGoalError'
					statusTextProps={{goalName: activeOption.name}}
				/>
			)}

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick} disabled={!amount} isLoading={isFundGoalLoading}>
					{APP_TEXT.fund}
				</Button>
			</Box>
		</>
	);
}
