import {APP_PATH, APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {Box, Button, ButtonType, DatePicker, Dialog, Icon, NumericInputWithOptions, PageHeader} from '@shared/ui';
import {savingModel} from '@entities/saving';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {DateService, isNumber} from '@shared/lib';

export function GoalWithdrawPage() {
	const navigate = useNavigate();

	const {withdrawGoal, isWithdrawGoalPending, isWithdrawGoalSuccess, isWithdrawGoalError} =
		savingModel.useWithdrawGoal();

	const {items} = savingModel.useItems({pageNumber: 0});
	const options = items?.map((option) => ({
		...option,
		image: <div className='h-10 w-10 rounded-full bg-primary-grey' />,
	}));
	// think about how to type activeOption
	const [activeOption, setActiveOption] = useState(options?.[0]);

	const [amount, setAmount] = useState<number | undefined>();
	const [date, setDate] = useState<Date>(new DateService().value);

	useEffect(() => {
		if (!options) return;
		setActiveOption(options[0]);
	}, [items]);

	function handleFundClick() {
		if (!activeOption?.id) return;

		const payload = {
			id: activeOption.id,
			amount: amount ?? 0,
			date: new DateService(date).getPayloadDateFormat(),
		};

		withdrawGoal(payload);
	}

	if (isWithdrawGoalSuccess || isWithdrawGoalError) {
		setTimeout(() => {
			navigate(APP_PATH.goalList);
		}, 2000);
	}

	const isAmountError = activeOption && isNumber(amount) && amount > activeOption.balance.amount;

	return (
		<>
			<PageHeader title={APP_TEXT.withdraw} backPath={APP_PATH.root} />

			<Box className='flex-1' basePaddingX>
				<NumericInputWithOptions
					value={amount}
					onChange={setAmount}
					options={options}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
					errorText={isAmountError && 'exceeds balance'}
					withMinus
				/>
				<Box baseMarginY>
					<DatePicker value={date} onChange={setDate} />
				</Box>
			</Box>

			<Dialog showUX={isWithdrawGoalSuccess || isWithdrawGoalError}>
				{isWithdrawGoalSuccess && activeOption && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.success}</div>
						</div>
						<div>
							Goal <span className='font-medium text-primary-violet'>{activeOption?.name} </span>
							has been withdrawn by{' '}
							<span className='font-medium text-primary-violet'>
								{amount} {CURRENCY_MAP[activeOption.balance.currency].symbol}
							</span>
						</div>
					</Box>
				)}
				{isWithdrawGoalError && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.error}</div>
						</div>
						<div>
							Some error occur during withdraw from{' '}
							<span className='font-medium text-primary-violet'>{activeOption?.name}</span>
						</div>
					</Box>
				)}
			</Dialog>

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick} disabled={!isNumber(amount) || isAmountError}>
					{isWithdrawGoalPending ? 'Loading...' : APP_TEXT.withdraw}
				</Button>
			</Box>
		</>
	);
}
