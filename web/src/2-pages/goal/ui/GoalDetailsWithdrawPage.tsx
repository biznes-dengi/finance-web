import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, ButtonType, DatePicker, Icon, NumericInputWithOptions, PageHeader, Popup} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {GoalModel} from '@entities/goal';
import {DateService, isNumber} from '@shared/lib';

export function GoalDetailsWithdrawPage() {
	const navigate = useNavigate();
	const {id} = useParams();

	const {goalDetails} = GoalModel.useItemDetails({id});
	const {withdraw, isWithdrawLoading, isWithdrawSuccess, isWithdrawError} = GoalModel.useWithdraw();

	const [activeOption, setActiveOption] = useState(goalDetails);

	const [amount, setAmount] = useState<number | undefined>();
	const [date, setDate] = useState<Date>(new DateService().value);

	useEffect(() => {
		if (!goalDetails) return;
		setActiveOption(goalDetails);
	}, [goalDetails]);

	function handleFundClick() {
		if (!activeOption?.id) return;

		withdraw({
			params: {id: activeOption.id},
			payload: {
				amount: amount ?? 0,
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	if (isWithdrawSuccess || isWithdrawError) {
		setTimeout(() => {
			navigate(APP_PATH.goal.getItemDetailsPath(id));
		}, 2000);
	}

	const isAmountError = activeOption && isNumber(amount) && amount > activeOption.balance.amount;

	return (
		<>
			<PageHeader title={APP_TEXT.withdraw} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<Box className='flex-1' basePaddingX>
				<NumericInputWithOptions
					value={amount}
					onChange={setAmount}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
					errorText={isAmountError && 'exceeds balance'}
					withMinus
				/>
				<Box baseMarginY>
					<DatePicker value={date} onChange={setDate} />
				</Box>
			</Box>

			<Popup isStatusDialogOpen={isWithdrawSuccess || isWithdrawError}>
				{isWithdrawSuccess && activeOption && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>
								<Icon type='success' />
							</div>
						</div>
						<div>
							Goal <span className='font-medium text-primary-violet'>{activeOption.name} </span>
							has been funded by{' '}
							<span className='font-medium text-primary-violet'>
								{amount} {CURRENCY_MAP[activeOption.balance.currency].symbol}
							</span>
						</div>
					</Box>
				)}
				{isWithdrawError && activeOption && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>
								<Icon type='error' />
							</div>
						</div>
						<div>
							Some error occur during funding{' '}
							<span className='font-medium text-primary-violet'>{activeOption.name}</span>
						</div>
					</Box>
				)}
			</Popup>

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick} disabled={!isNumber(amount) || isAmountError}>
					{isWithdrawLoading ? 'Loading...' : APP_TEXT.withdraw}
				</Button>
			</Box>
		</>
	);
}
