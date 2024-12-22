import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {
	AmountField,
	AmountFieldOption,
	Button,
	ButtonType,
	DatePicker,
	Icon,
	PageHeader,
	TransactionPageHelpers,
} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {cn, DateService, isEqual, useResponsive} from '@shared/lib';

export function GoalDetailsTransferPage() {
	const {id} = useParams();
	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {goals, isGoalsLoading} = GoalModel.useItems({filter: {pageNumber: 0}});

	const [options, setOptions] = useState<AmountFieldOption[] | undefined>();
	const [fromActiveOption, setFromActiveOption] = useState<AmountFieldOption | null>(null);
	const [toActiveOption, setToActiveOption] = useState<AmountFieldOption | null>(null);

	const [fromGoalAmount, setFromGoalAmount] = useState('');
	const [toGoalAmount, setToGoalAmount] = useState('');

	const [date, setDate] = useState<Date>(new DateService().value);

	const {transferGoal, isTransferGoalLoading} = GoalModel.useTransfer();

	const {isMobile} = useResponsive();

	useEffect(() => {
		if (goalDetails) {
			setFromActiveOption(TransactionPageHelpers.mapItemDataToOption(goalDetails));
		}

		if (goals && goalDetails) {
			goals.forEach((option) => {
				if (option.id !== goalDetails.id) {
					setToActiveOption(TransactionPageHelpers.mapItemDataToOption(option));
				}
			});

			setOptions(
				goals.filter((goal) => goal.id !== goalDetails.id).map(TransactionPageHelpers.mapItemDataToOption),
			);
		}
	}, [goalDetails, goals]);

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
			<PageHeader title={APP_TEXT.transfer} backPath={APP_PATH.goal.getItemDetailsPath(id)} />

			<div className='flex-1 px-4'>
				<div className='relative flex flex-col gap-2'>
					<AmountField
						value={fromGoalAmount}
						onChange={setFromGoalAmount}
						activeOption={fromActiveOption}
						setActiveOption={(activeOption) => {
							setFromActiveOption(activeOption);
							if (isEqual(activeOption.id, toActiveOption?.id)) {
								setToActiveOption(fromActiveOption);
							}
						}}
						errorText={isFromAmountError && 'exceeds balance'}
						isLoading={isGoalDetailsLoading || isGoalsLoading}
						withMinus
					/>

					<div
						className={cn(
							'absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white transition-all duration-200',
						)}
					>
						<Icon type='transferTo' className='size-4 text-primary-violet' />
					</div>

					<AmountField
						value={toGoalAmount}
						onChange={setToGoalAmount}
						activeOption={toActiveOption}
						setActiveOption={(activeOption) => {
							if (isEqual(activeOption.id, fromActiveOption?.id)) {
								setFromActiveOption(toActiveOption);
							}
							setToActiveOption(activeOption);
						}}
						options={options}
						isLoading={isGoalDetailsLoading || isGoalsLoading}
						withPlus
						isAutoFocusDisabled
					/>
				</div>

				<div className='my-4 flex flex-col gap-2'>
					<DatePicker type='transactionDate' value={date} onChange={setDate} />
				</div>
			</div>

			<div className={cn('p-4', !isMobile && 'w-96 self-center')}>
				<Button
					type={ButtonType.main}
					onClick={handleTransferClick}
					disabled={!fromGoalAmount || !toGoalAmount || isFromAmountError}
					isLoading={isTransferGoalLoading}
				>
					{APP_TEXT.transfer}
				</Button>
			</div>
		</>
	);
}
