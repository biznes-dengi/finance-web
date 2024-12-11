import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {Box, Button, ButtonType, DatePicker, NumericInputWithOptions, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {DateService, isNumber} from '@shared/lib';

export function GoalDetailsFundPage() {
	const navigate = useNavigate();
	const {id} = useParams();

	const {goalDetails} = GoalModel.useItemDetails({id});
	const {deposit, isDepositLoading, isDepositSuccess, isDepositError} = GoalModel.useDeposit();

	const [activeOption, setActiveOption] = useState(goalDetails);

	const [amount, setAmount] = useState<number | undefined>();
	const [date, setDate] = useState<Date>(new DateService().value);

	useEffect(() => {
		if (!goalDetails) return;
		setActiveOption(goalDetails);
	}, [goalDetails]);

	function handleFundClick() {
		if (!activeOption?.id) return;

		deposit({
			params: {id: String(activeOption.id)},
			payload: {
				amount: amount ?? 0,
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	if (isDepositSuccess || isDepositError) {
		setTimeout(() => {
			navigate(APP_PATH.goal.getItemDetailsPath(id));
		}, 2000);
	}

	return (
		<>
			<PageHeader title={APP_TEXT.fund} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<Box className='flex-1' basePaddingX>
				<NumericInputWithOptions
					value={amount}
					onChange={setAmount}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
					withPlus
				/>
				<Box baseMarginY>
					<DatePicker value={date} onChange={setDate} />
				</Box>
			</Box>

			{/*<Popup isStatusDialogOpen={isDepositSuccess || isDepositError}>*/}
			{/*	{isDepositSuccess && activeOption && (*/}
			{/*		<Box baseMarginY className='text-center'>*/}
			{/*			<div className='mb-4 flex justify-center'>*/}
			{/*				<div className='size-16 text-primary-violet'>*/}
			{/*					<Icon type='success' />*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*			<div>*/}
			{/*				Goal <span className='font-medium text-primary-violet'>{activeOption.name} </span>*/}
			{/*				has been funded by{' '}*/}
			{/*				<span className='font-medium text-primary-violet'>*/}
			{/*					{amount} {CURRENCY_MAP[activeOption.balance.currency].symbol}*/}
			{/*				</span>*/}
			{/*			</div>*/}
			{/*		</Box>*/}
			{/*	)}*/}
			{/*	{isDepositError && activeOption && (*/}
			{/*		<Box baseMarginY className='text-center'>*/}
			{/*			<div className='mb-4 flex justify-center'>*/}
			{/*				<div className='size-16 text-primary-violet'>*/}
			{/*					<Icon type='error' />*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*			<div>*/}
			{/*				Some error occur during funding{' '}*/}
			{/*				<span className='font-medium text-primary-violet'>{activeOption.name}</span>*/}
			{/*			</div>*/}
			{/*		</Box>*/}
			{/*	)}*/}
			{/*</Popup>*/}

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick} disabled={!isNumber(amount)}>
					{isDepositLoading ? 'Loading...' : APP_TEXT.fund}
				</Button>
			</Box>
		</>
	);
}
