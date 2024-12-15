import {useEffect, useState} from 'react';
import {GoalDetailsTransactionPageProps} from '../types/TransactionPage.types.ts';
import {TransactionPageHelpers} from '../lib/TransactionPage.helpers.ts';
import {AmountField, type AmountFieldOption, Button, ButtonType, DatePicker, PageHeader, StatusPopup} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {DateService, isNumber, TextHelpers} from '@shared/lib';

export function TransactionPage(props: GoalDetailsTransactionPageProps) {
	const {
		itemDetails,
		items,
		isItemDataLoading,
		actionType,
		action,
		isActionLoading,
		isActionSuccess,
		isActionError,
		successMessageKey,
		errorMessageKey,
		backPath,
	} = props;

	const [activeOption, setActiveOption] = useState<AmountFieldOption | null>(null);
	const [amount, setAmount] = useState<string>('');
	const [date, setDate] = useState<Date>(new DateService().value!);

	useEffect(() => {
		if (itemDetails) {
			return setActiveOption(TransactionPageHelpers.mapItemDataToOption(itemDetails));
		}

		if (items) {
			return setActiveOption(TransactionPageHelpers.mapItemDataToOption(items[0]));
		}

		return setActiveOption(null);
	}, [itemDetails, items]);

	function handleActionClick() {
		if (!activeOption?.id) return;

		action({
			params: {id: activeOption.id},
			payload: {amount: Number(amount), date: new DateService(date).getPayloadDateFormat()},
		});
	}

	const showWithdrawValidation =
		actionType === 'withdraw' && !!activeOption && isNumber(amount) && Number(amount) > Number(activeOption.amount);

	return (
		<>
			<PageHeader title={APP_TEXT[actionType]} backPath={backPath} />

			<div className='flex-1 px-4'>
				<AmountField
					value={amount}
					onChange={setAmount}
					activeOption={activeOption}
					isLoading={isItemDataLoading}
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
