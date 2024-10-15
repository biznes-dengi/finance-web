import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, ButtonType, Dialog, NumericInputWithOptions, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {savingModel} from '@entities/saving';
import {DatePicker} from '@shared/ui/date-picker/ui/DatePicker.tsx';
import {DateService} from '@shared/lib';

export function GoalFundPage() {
	const navigate = useNavigate();

	const {fundGoal, isFundGoalPending, isFundGoalSuccess, isFundGoalError} = savingModel.useFundGoal();

	// TODO: тип items должен быть ItemsData | undefined, а сейчас только item[]
	const {items} = savingModel.useItems({pageNumber: 0});
	const options = items?.map((option) => ({
		...option,
		image: <div className='h-10 w-10 rounded-full bg-primary-grey' />,
	}));
	const [activeOption, setActiveOption] = useState<(typeof options)[0]>();

	const [amount, setAmount] = useState<number | undefined>();
	const [date, setDate] = useState<Date>(new Date());

	useEffect(() => {
		if (!items) return;
		setActiveOption(options[0]);
	}, [items]);

	function handleFundClick() {
		if (!activeOption?.id) return;

		const payload = {
			id: activeOption.id,
			amount: amount ?? 0,
			date: new DateService(date).getPayloadDateFormat(),
		};

		console.log(payload);

		// fundGoal(payload);
	}

	if (isFundGoalSuccess || isFundGoalError) {
		setTimeout(() => {
			navigate(APP_PATH.goalList);
		}, 2000);
	}

	// TODO: тип items должен быть ItemsData | undefined
	if (!items) return null;

	return (
		<>
			<PageHeader title={APP_TEXT.fund} backPath={APP_PATH.root} />

			<Box className='flex-1' basePaddingX>
				<NumericInputWithOptions
					value={amount}
					onChange={setAmount}
					options={options}
					activeOption={activeOption}
					setActiveOption={setActiveOption}
				/>
				<DatePicker value={date} onChange={setDate} />
			</Box>

			<Dialog showUX={isFundGoalSuccess || isFundGoalError}>
				{isFundGoalSuccess && <Box baseMarginY>Success drawer - goal was funded successfully</Box>}
				{isFundGoalError && <Box baseMarginY>Error drawer - Some error occur / goal not funded, try again later</Box>}
			</Dialog>

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick}>
					{isFundGoalPending ? 'Loading...' : APP_TEXT.fund}
				</Button>
			</Box>
		</>
	);
}
