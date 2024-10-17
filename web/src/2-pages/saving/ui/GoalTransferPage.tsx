import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
	Box,
	Button,
	ButtonType,
	CurrencyPicker,
	DatePicker,
	Dialog,
	Icon,
	NumericInputWithOptions,
	PageHeader,
} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {savingModel} from '@entities/saving';
import {cn, DateService, isEqual, isNumber} from '@shared/lib';

const initialExchangeRate = 3.9071;

export function GoalTransferPage() {
	const [exchangeRate, setExchangeRate] = useState<number>(initialExchangeRate);

	const navigate = useNavigate();

	const [date, setDate] = useState<Date>(new DateService().value);

	const {items} = savingModel.useItems({pageNumber: 0});
	const options = items?.map((option) => ({
		...option,
		image: <div className='h-10 w-10 rounded-full bg-primary-grey' />,
	}));
	// think about how to type activeOption
	const [fromActiveOption, setFromActiveOption] = useState(options?.[0]);
	const [fromAmount, setFromAmount] = useState<number | undefined>();

	const [toActiveOption, setToActiveOption] = useState(options?.[1]);
	const [toAmount, setToAmount] = useState<number | undefined>();

	// const [isOrderChanged, setIsOrderChanged] = useState(false);

	const {transfer, isTransferPending, isTransferSuccess, isTransferError} = savingModel.useTransfer();

	useEffect(() => {
		if (!options) return;
		setFromActiveOption(options[0]);
		setToActiveOption(options[1]);
	}, [items]);

	function handleCurrencyRateChange(value: number | undefined) {
		setExchangeRate(value ? Number(value.toFixed(4)) : initialExchangeRate);
	}

	function handleFromAmountChange(fromValue: number | undefined) {
		setFromAmount(fromValue);

		setToAmount(fromValue ? Number((fromValue * exchangeRate).toFixed(2)) : undefined);
	}
	function handleToAmountChange(toValue: number | undefined) {
		setToAmount(toValue);

		if (isNumber(fromAmount)) {
			handleCurrencyRateChange(toValue ? toValue / fromAmount : initialExchangeRate);
		}

		if (!isNumber(fromAmount)) {
			setFromAmount(toValue ? Number((toValue * exchangeRate).toFixed(2)) : undefined);
		}
	}
	function handleTransferClick() {
		if (!fromActiveOption || !toActiveOption || !fromAmount) return;

		const payload = {
			fromGoalId: fromActiveOption.id,
			toGoalId: toActiveOption.id,
			fromAmount,
			toAmount,
			date: new DateService(date).getPayloadDateFormat(),
		};

		console.log(payload);

		// transfer(payload);
	}

	if (isTransferSuccess || isTransferError) {
		setTimeout(() => {
			navigate(APP_PATH.goalList);
		}, 2000);
	}

	const isFromAmountError = isNumber(fromAmount) && fromActiveOption && fromAmount > fromActiveOption.balance.amount;

	return (
		<>
			<PageHeader title={APP_TEXT.transfer} backPath={APP_PATH.root} />

			<Box basePaddingX className='relative flex-1'>
				<Box className='flex flex-col gap-2'>
					<NumericInputWithOptions
						value={fromAmount}
						onChange={handleFromAmountChange}
						activeOption={fromActiveOption}
						setActiveOption={(activeOption) => {
							setFromActiveOption(activeOption);
							if (isEqual(activeOption.id, toActiveOption?.id)) {
								setToActiveOption(fromActiveOption);
							}
						}}
						options={options}
						errorText={isFromAmountError && 'exceeds balance'}
						isFromOption
					/>

					<div
						className={cn(
							// isOrderChanged && 'rotate-180 transition-transform',
							'absolute left-[170px] top-[74px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-200',
						)}
						// onClick={() => setIsOrderChanged(!isOrderChanged)}
					>
						<div className='h-4 w-4 text-primary-violet'>{Icon.transferTo}</div>
					</div>

					<NumericInputWithOptions
						value={toAmount}
						onChange={handleToAmountChange}
						activeOption={toActiveOption}
						setActiveOption={(activeOption) => {
							if (isEqual(activeOption.id, fromActiveOption?.id)) {
								setFromActiveOption(toActiveOption);
							}
							setToActiveOption(activeOption);
						}}
						options={options}
						isToOption
					/>
				</Box>

				<Box baseMarginY className='flex flex-col gap-3'>
					<CurrencyPicker
						buttonText={`1 $ = ${exchangeRate ?? ''} zł`}
						value={exchangeRate}
						onChange={(value) => {
							handleCurrencyRateChange(value);

							if (isNumber(toAmount) && isNumber(fromAmount) && value) {
								setToAmount(Number((fromAmount * value).toFixed(2)));
							}
						}}
					/>

					<DatePicker value={date} onChange={setDate} />
				</Box>
			</Box>

			<Box basePadding className='flex items-center justify-center'>
				<Button
					type={ButtonType.main}
					onClick={handleTransferClick}
					disabled={!isNumber(fromAmount) || !isNumber(toAmount) || isFromAmountError}
					className='w-[375px]'
				>
					{isTransferPending ? 'Loading...' : APP_TEXT.transfer}
				</Button>
			</Box>

			<Dialog showUX={isTransferSuccess || isTransferError}>
				{isTransferSuccess && fromAmount && fromActiveOption && toActiveOption && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.success}</div>
						</div>
						<div>
							<span className='font-medium text-primary-violet'>
								{fromAmount} {CURRENCY_MAP[fromActiveOption.balance.currency].symbol}{' '}
							</span>
							has been transferred from <span className='font-medium text-primary-violet'>{fromActiveOption.name}</span>{' '}
							to <span className='font-medium text-primary-violet'>{toActiveOption.name}</span>
						</div>
					</Box>
				)}
				{isTransferError && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.error}</div>
						</div>
						<div>Some error occur during transferring</div>
					</Box>
				)}
			</Dialog>
		</>
	);
}
