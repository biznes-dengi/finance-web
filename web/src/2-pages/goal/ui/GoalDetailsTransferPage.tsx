import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
import {goalModel} from '@entities/goal';
import {cn, DateService, isEqual, isNumber} from '@shared/lib';
import {getGoalDetailsPath} from '@shared/constants/appPath.constant.ts';

const initialExchangeRate = 3.9071;

export function GoalDetailsTransferPage() {
	const [exchangeRate, setExchangeRate] = useState<number>(initialExchangeRate);

	const navigate = useNavigate();

	const [date, setDate] = useState<Date>(new DateService().value);

	const {goalId} = useParams();

	const {goalDetails} = goalModel.useDetails(goalId);

	const {items} = goalModel.useItems({pageNumber: 0});
	const options = items?.map((option) => ({
		...option,
		image: <div className='h-10 w-10 rounded-full bg-primary-grey' />,
	}));
	// think about how to type activeOption
	const [fromActiveOption, setFromActiveOption] = useState(options?.[0]);
	const [fromGoalAmount, setFromGoalAmount] = useState<number | undefined>();

	const [toActiveOption, setToActiveOption] = useState(options?.[1]);
	const [toGoalAmount, setToGoalAmount] = useState<number | undefined>();

	// const [isOrderChanged, setIsOrderChanged] = useState(false);

	const {transfer, isTransferPending, isTransferSuccess, isTransferError} = goalModel.useTransfer();

	useEffect(() => {
		if (goalDetails) {
			setFromActiveOption({...goalDetails, image: <div className='h-10 w-10 rounded-full bg-primary-grey' />});
		}

		if (options && goalDetails) {
			options.forEach((option) => {
				if (option.id !== goalDetails.id) {
					setToActiveOption(option);
				}
			});
		}
	}, [goalDetails, items]);

	function handleCurrencyRateChange(value: number | undefined) {
		setExchangeRate(value ? Number(value.toFixed(4)) : initialExchangeRate);
	}

	function handleFromAmountChange(fromValue: number | undefined) {
		setFromGoalAmount(fromValue);

		setToGoalAmount(fromValue ? Number((fromValue * exchangeRate).toFixed(2)) : undefined);
	}
	function handleToAmountChange(toValue: number | undefined) {
		setToGoalAmount(toValue);

		if (isNumber(fromGoalAmount)) {
			handleCurrencyRateChange(toValue ? toValue / fromGoalAmount : initialExchangeRate);
		}

		if (!isNumber(fromGoalAmount)) {
			setFromGoalAmount(toValue ? Number((toValue * exchangeRate).toFixed(2)) : undefined);
		}
	}
	function handleTransferClick() {
		if (!fromActiveOption || !toActiveOption || !fromGoalAmount || !toGoalAmount) return;

		const payload = {
			fromGoalId: fromActiveOption.id,
			toGoalId: toActiveOption.id,
			fromGoalAmount,
			toGoalAmount,
			date: new DateService(date).getPayloadDateFormat(),
		};

		transfer(payload);
	}

	if (isTransferSuccess || isTransferError) {
		setTimeout(() => {
			navigate(getGoalDetailsPath(goalId));
		}, 2000);
	}

	const isFromAmountError =
		isNumber(fromGoalAmount) && fromActiveOption && fromGoalAmount > fromActiveOption.balance.amount;

	return (
		<>
			<PageHeader title={APP_TEXT.transfer} backPath={APP_PATH.root} />

			<Box basePaddingX className='relative flex-1'>
				<Box className='flex flex-col gap-2'>
					<NumericInputWithOptions
						value={fromGoalAmount}
						onChange={handleFromAmountChange}
						activeOption={fromActiveOption}
						setActiveOption={(activeOption) => {
							setFromActiveOption(activeOption);
							if (isEqual(activeOption.id, toActiveOption?.id)) {
								setToActiveOption(fromActiveOption);
							}
						}}
						errorText={isFromAmountError && 'exceeds balance'}
						withMinus
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
						value={toGoalAmount}
						onChange={handleToAmountChange}
						activeOption={toActiveOption}
						setActiveOption={(activeOption) => {
							if (isEqual(activeOption.id, fromActiveOption?.id)) {
								setFromActiveOption(toActiveOption);
							}
							setToActiveOption(activeOption);
						}}
						options={options}
						withPlus
					/>
				</Box>

				<Box baseMarginY className='flex flex-col gap-3'>
					<CurrencyPicker
						buttonText={`1 $ = ${exchangeRate ?? ''} zł`}
						value={exchangeRate}
						onChange={(value) => {
							handleCurrencyRateChange(value);

							if (isNumber(toGoalAmount) && isNumber(fromGoalAmount) && value) {
								setToGoalAmount(Number((fromGoalAmount * value).toFixed(2)));
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
					disabled={!isNumber(fromGoalAmount) || !isNumber(toGoalAmount) || isFromAmountError}
					className='w-[375px]'
				>
					{isTransferPending ? 'Loading...' : APP_TEXT.transfer}
				</Button>
			</Box>

			<Dialog showUX={isTransferSuccess || isTransferError}>
				{isTransferSuccess && fromGoalAmount && fromActiveOption && toActiveOption && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.success}</div>
						</div>
						<div>
							<span className='font-medium text-primary-violet'>
								{fromGoalAmount} {CURRENCY_MAP[fromActiveOption.balance.currency].symbol}{' '}
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
