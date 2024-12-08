import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, ButtonType, DatePicker, Popup, Icon, NumericInputWithOptions, PageHeader} from '@shared/ui';
import {APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {GoalModel} from '@entities/goal';
import {DateService, isNumber} from '@shared/lib';
import {getGoalDetailsPath} from '@shared/constants/appPath.constant.ts';

export function GoalDetailsWithdrawPage() {
	const navigate = useNavigate();
	const {goalId} = useParams();

	const {itemDetails} = GoalModel.useItemDetails({id: Number(goalId)});
	const {withdraw, isWithdrawLoading, isWithdrawSuccess, isWithdrawError} = GoalModel.useWithdraw();

	const [activeOption, setActiveOption] = useState(itemDetails);

	const [amount, setAmount] = useState<number | undefined>();
	const [date, setDate] = useState<Date>(new DateService().value);

	useEffect(() => {
		if (!itemDetails) return;
		setActiveOption(itemDetails);
	}, [itemDetails]);

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
			navigate(getGoalDetailsPath(goalId));
		}, 2000);
	}

	const isAmountError = activeOption && isNumber(amount) && amount > activeOption.balance.amount;

	return (
		<>
			<PageHeader title={APP_TEXT.withdraw} backPath={getGoalDetailsPath(goalId)} />

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
