import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AmountField, Button, ButtonType, DatePicker, PageHeader, StatusPopup, type StatusTextKey} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';
import {DateService, isNumber, TextHelpers} from '@shared/lib';

type actionParams = {
	params: {id: number | string};
	payload: {amount: number; date: string};
};

interface GoalDetailsTransactionPageProps {
	details: any;
	isDetailsLoading: boolean;
	actionType: 'fund' | 'withdraw';
	action: (params: actionParams) => void;
	isActionLoading: boolean;
	isActionSuccess: boolean;
	isActionError: boolean;
	successMessageKey: StatusTextKey;
	errorMessageKey: StatusTextKey;
}

type ActiveOption = {
	id: number | string;
	name: string;
	amount: number;
	currency: CURRENCY;
};

export function TransactionPage(props: GoalDetailsTransactionPageProps) {
	const {
		details,
		isDetailsLoading,
		actionType,
		action,
		isActionLoading,
		isActionSuccess,
		isActionError,
		successMessageKey,
		errorMessageKey,
	} = props;

	const {id} = useParams();

	const [activeOption, setActiveOption] = useState<ActiveOption | null>(null);
	const [amount, setAmount] = useState<string>('');
	const [date, setDate] = useState<Date>(new DateService().value!);

	useEffect(() => {
		if (!details) {
			return setActiveOption(null);
		}

		setActiveOption({
			id: details.id,
			name: details.name,
			amount: details.balance.amount,
			currency: details.balance.currency,
		});
	}, [details]);

	function handleActionClick() {
		if (!activeOption?.id) return;

		action({
			params: {id: activeOption.id},
			payload: {amount: Number(amount), date: new DateService(date).getPayloadDateFormat()},
		});
	}

	const showWithdrawValidation =
		actionType === 'withdraw' && !!activeOption && isNumber(amount) && Number(amount) > activeOption.amount;

	return (
		<>
			<PageHeader title={APP_TEXT[actionType]} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<div className='flex-1 px-4'>
				<AmountField
					value={amount}
					onChange={setAmount}
					activeOption={activeOption}
					isLoading={isDetailsLoading}
					errorText={showWithdrawValidation && 'exceeds balance'}
					withPlus={actionType === 'fund'}
					withMinus={actionType === 'withdraw'}
				/>
				<div className='my-4'>
					<DatePicker value={date} onChange={setDate} />
				</div>
			</div>

			{activeOption && (
				<StatusPopup
					isOpen={isActionSuccess}
					status='success'
					statusTextKey={successMessageKey}
					statusTextProps={{
						goalName: activeOption.name,
						amount: `${TextHelpers.getAmountWithCurrency(amount, activeOption.currency)}`,
					}}
				/>
			)}
			{activeOption && (
				<StatusPopup
					isOpen={isActionError}
					status='error'
					statusTextKey={errorMessageKey}
					statusTextProps={{goalName: activeOption.name}}
				/>
			)}

			<div className='my-6 px-4'>
				<Button type={ButtonType.main} onClick={handleActionClick} disabled={!amount} isLoading={isActionLoading}>
					{APP_TEXT[actionType]}
				</Button>
			</div>
		</>
	);
}
