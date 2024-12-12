import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Box, Button, ButtonType, DatePicker, AmountField, PageHeader} from '@shared/ui';
import {GoalModel} from '@entities/goal';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {DateService, isNumber} from '@shared/lib';

export function GoalWithdrawPage() {
	const navigate = useNavigate();

	const {withdraw, isWithdrawLoading, isWithdrawSuccess, isWithdrawError} = GoalModel.useWithdraw();

	const {goals} = GoalModel.useItems({filter: {pageNumber: 0}});
	const options = goals?.map((option) => ({
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
	}, [goals]);

	function handleFundClick() {
		if (!activeOption?.id) return;

		withdraw({
			params: {id: String(activeOption.id)},
			payload: {
				amount: amount ?? 0,
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	if (isWithdrawSuccess || isWithdrawError) {
		setTimeout(() => {
			navigate(APP_PATH.home);
		}, 2000);
	}

	const isAmountError = activeOption && isNumber(amount) && amount > activeOption.balance.amount;

	return (
		<>
			<PageHeader title={APP_TEXT.withdraw} backPath={APP_PATH.home} />

			<Box className='flex-1' basePaddingX>
				<AmountField
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

			{/*<Popup isStatusDialogOpen={isWithdrawSuccess || isWithdrawError}>*/}
			{/*	{isWithdrawSuccess && activeOption && (*/}
			{/*		<Box baseMarginY className='text-center'>*/}
			{/*			<div className='mb-4 flex justify-center'>*/}
			{/*				<div className='size-16 text-primary-violet'>*/}
			{/*					<Icon type='success' />*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*			<div>*/}
			{/*				Goal <span className='font-medium text-primary-violet'>{activeOption?.name} </span>*/}
			{/*				has been withdrawn by{' '}*/}
			{/*				<span className='font-medium text-primary-violet'>*/}
			{/*					{amount} {CURRENCY_MAP[activeOption.balance.currency].symbol}*/}
			{/*				</span>*/}
			{/*			</div>*/}
			{/*		</Box>*/}
			{/*	)}*/}
			{/*	{isWithdrawError && (*/}
			{/*		<Box baseMarginY className='text-center'>*/}
			{/*			<div className='mb-4 flex justify-center'>*/}
			{/*				<div className='size-16 text-primary-violet'>*/}
			{/*					<Icon type='error' />*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*			<div>*/}
			{/*				Some error occur during withdraw from{' '}*/}
			{/*				<span className='font-medium text-primary-violet'>{activeOption?.name}</span>*/}
			{/*			</div>*/}
			{/*		</Box>*/}
			{/*	)}*/}
			{/*</Popup>*/}

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick} disabled={!isNumber(amount) || isAmountError}>
					{isWithdrawLoading ? 'Loading...' : APP_TEXT.withdraw}
				</Button>
			</Box>
		</>
	);
}
