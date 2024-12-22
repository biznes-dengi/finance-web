import {useEffect, useState} from 'react';
import {type FundWithdrawPageProps} from '../types/MoneyActionPage.types.ts';
import {MoneyActionPageHelpers} from '../lib/MoneyActionPage.helpers.ts';
import {AmountField, type AmountFieldOption, Button, ButtonType, DatePicker, PageHeader, StatusPopup} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {cn, DateService, isNumber, TextHelpers, useResponsive} from '@shared/lib';

export function FundWithdrawPage(props: FundWithdrawPageProps) {
	const {
		itemDetails,
		items,
		isItemDataLoading,
		actionType,
		action,
		isActionLoading,
		isActionSuccess,
		isActionError,
		successTextKey,
		errorTextKey,
		backPath,
	} = props;

	const {isMobile} = useResponsive();

	const [activeOption, setActiveOption] = useState<AmountFieldOption | null>(null);
	const [options, setOptions] = useState<AmountFieldOption[] | undefined>();

	const [amount, setAmount] = useState('');
	const [date, setDate] = useState<Date>(new DateService().value!);

	useEffect(() => {
		if (itemDetails) {
			setActiveOption(MoneyActionPageHelpers.mapItemDataToOption(itemDetails));
		}

		if (items) {
			setOptions(items.map(MoneyActionPageHelpers.mapItemDataToOption));
			setActiveOption(MoneyActionPageHelpers.mapItemDataToOption(items[0]));
		}
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
					options={options}
					setActiveOption={setActiveOption}
					isLoading={isItemDataLoading}
					errorText={showWithdrawValidation && 'exceeds balance'}
					withPlus={actionType === 'fund'}
					withMinus={actionType === 'withdraw'}
				/>
				<div className='my-4'>
					<DatePicker type='transactionDate' value={date} onChange={setDate} />
				</div>
			</div>

			<div className={cn('p-4', !isMobile && 'w-96 self-center')}>
				<Button
					type={ButtonType.main}
					onClick={handleActionClick}
					disabled={!amount}
					isLoading={isActionLoading}
				>
					{APP_TEXT[actionType]}
				</Button>
			</div>

			{activeOption && (
				<StatusPopup
					isOpen={isActionSuccess}
					status='success'
					statusTextKey={successTextKey}
					statusTextProps={{
						name: activeOption.name,
						amount: `${TextHelpers.getAmountWithCurrency(amount, activeOption.currency)}`,
					}}
				/>
			)}
			{activeOption && (
				<StatusPopup
					isOpen={isActionError}
					status='error'
					statusTextKey={errorTextKey}
					statusTextProps={{name: activeOption.name}}
				/>
			)}
		</>
	);
}
