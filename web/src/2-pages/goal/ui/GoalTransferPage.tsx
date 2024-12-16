import {useEffect, useState} from 'react';
import {
	AmountField,
	type AmountFieldOption,
	Button,
	ButtonType,
	CurrencyPicker,
	DatePicker,
	Icon,
	PageHeader,
} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {GoalModel} from '@entities/goal';
import {cn, DateService, isEqual, isNumber, useResponsive} from '@shared/lib';
import {TransactionPageHelpers} from '@shared/ui/transaction-page/lib/TransactionPage.helpers.ts';

// const initialExchangeRate = 3.9071; for zł
const initialExchangeRate = 1;

export function GoalTransferPage() {
	const [exchangeRate, setExchangeRate] = useState(initialExchangeRate);

	const {goals, isGoalsLoading} = GoalModel.useItems({filter: {pageNumber: 0}});

	const [options, setOptions] = useState<AmountFieldOption[] | undefined>();
	const [fromActiveOption, setFromActiveOption] = useState<AmountFieldOption | null>(null);
	const [toActiveOption, setToActiveOption] = useState<AmountFieldOption | null>(null);
	const [fromGoalAmount, setFromGoalAmount] = useState('');
	const [toGoalAmount, setToGoalAmount] = useState('');

	// const [isOrderChanged, setIsOrderChanged] = useState(false);

	const [date, setDate] = useState<Date>(new DateService().value);

	const {transferGoal, isTransferGoalLoading} = GoalModel.useTransfer();

	const {isMobile} = useResponsive();

	useEffect(() => {
		if (!goals) return;

		const options = goals.map(TransactionPageHelpers.mapItemDataToOption);

		setFromActiveOption(options[0]);
		setToActiveOption(options[1]);
		setOptions(options);
	}, [goals]);

	function handleFromAmountChange(fromValue: string) {
		setFromGoalAmount(fromValue);

		// setToGoalAmount(fromValue ? Number((fromValue * exchangeRate).toFixed(2)) : undefined);
	}
	function handleToAmountChange(toValue: string) {
		setToGoalAmount(toValue);

		// if (isNumber(fromGoalAmount)) {
		// 	handleCurrencyRateChange(toValue ? toValue / fromGoalAmount : initialExchangeRate);
		// }
		//
		// if (!isNumber(fromGoalAmount)) {
		// 	setFromGoalAmount(toValue ? Number((toValue * exchangeRate).toFixed(2)) : undefined);
		// }
	}

	function handleFromOptionSelect(activeOption: AmountFieldOption) {
		setFromActiveOption(activeOption);
		if (toActiveOption && isEqual(activeOption.id, toActiveOption.id)) {
			setToActiveOption(fromActiveOption);
		}
	}

	function handleToOptionSelect(activeOption: AmountFieldOption) {
		if (isEqual(activeOption.id, fromActiveOption?.id)) {
			setFromActiveOption(toActiveOption);
		}
		setToActiveOption(activeOption);
	}

	function handleCurrencyRateChange(value: number | undefined) {
		setExchangeRate(value ? Number(value.toFixed(4)) : initialExchangeRate);
	}

	function handleCurrencyChange(value: number) {
		handleCurrencyRateChange(value);

		if (isNumber(toGoalAmount) && isNumber(fromGoalAmount) && value) {
			setToGoalAmount((fromGoalAmount * value).toFixed(2));
		}
	}

	function handleTransferClick() {
		if (!fromActiveOption || !toActiveOption || !fromGoalAmount || !toGoalAmount) return;

		transferGoal({
			payload: {
				fromGoalId: fromActiveOption.id!,
				toGoalId: toActiveOption.id!,
				fromGoalAmount: Number(fromGoalAmount),
				toGoalAmount: Number(toGoalAmount),
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	const isFromAmountError =
		!!fromGoalAmount && !!fromActiveOption && Number(fromGoalAmount) > Number(fromActiveOption.amount);

	return (
		<>
			<PageHeader title={APP_TEXT.transfer} backPath={APP_PATH.home} />

			<div className='relative flex-1 px-4'>
				<div className='flex flex-col gap-2'>
					<AmountField
						value={fromGoalAmount}
						onChange={handleFromAmountChange}
						activeOption={fromActiveOption}
						setActiveOption={handleFromOptionSelect}
						options={options}
						errorText={isFromAmountError && 'exceeds balance'}
						isLoading={isGoalsLoading}
						withMinus
					/>

					<div
						className={cn(
							// isOrderChanged && 'rotate-180 transition-transform',
							'absolute left-[170px] top-[74px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-200',
						)}
						// onClick={() => setIsOrderChanged(!isOrderChanged)}
					>
						<Icon type='transferTo' className='size-4 text-primary-violet' />
					</div>

					<AmountField
						value={toGoalAmount}
						onChange={handleToAmountChange}
						activeOption={toActiveOption}
						setActiveOption={handleToOptionSelect}
						options={options}
						isLoading={isGoalsLoading}
						withPlus
						isAutoFocusDisabled
					/>
				</div>

				<div className='my-4 flex flex-col gap-2'>
					<CurrencyPicker
						buttonText={`1 $ = ${exchangeRate ?? ''} $`}
						value={exchangeRate}
						onChange={handleCurrencyChange}
					/>
					<DatePicker type='transactionDate' value={date} onChange={setDate} />
				</div>
			</div>

			<div className={cn('p-4', !isMobile && 'w-96 self-center')}>
				<Button
					type={ButtonType.main}
					onClick={handleTransferClick}
					disabled={!fromGoalAmount || !toGoalAmount}
					isLoading={isTransferGoalLoading}
				>
					{APP_TEXT.transfer}
				</Button>
			</div>
		</>
	);
}
