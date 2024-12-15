import {useState} from 'react';
import {GoalImageField} from '@widgets/goal';
import {GoalModel} from '@entities/goal';
import {
	AmountField,
	Button,
	ButtonType,
	DatePicker,
	PageHeader,
	SelectWithSearch,
	StatusPopup,
	TextField,
} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';
import {cn, DateService, useResponsive} from '@shared/lib';

const hints = ['Mustang', 'House', 'Guitar', 'Maldives', 'TV', 'iPhone', 'Education'];
const initialStepIndex = 0;
const initialName = '';
const initialTargetAmount = '';
const currencyOptions = [{description: 'USD', name: 'US Dollar', value: CURRENCY.USD}];

export function GoalCreatePage() {
	const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex);

	/** Form state */
	const [name, setName] = useState(initialName);
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);
	const [targetAmount, setTargetAmount] = useState(initialTargetAmount);
	const [deadline, setDeadline] = useState<Date>();

	const {createGoal, isCreateGoalLoading, isCreateGoalSuccess, isCreateGoalError} = GoalModel.useCreateItem();

	const {isMobile} = useResponsive();

	const activeOption = {
		name: currencyOptions.find((option) => option.value === currency)?.description ?? '',
		currency: currency as CURRENCY,
	};

	function handleCreateClick() {
		if (!targetAmount) return;

		createGoal({
			payload: {
				name,
				currency,
				targetAmount: Number(targetAmount),
				deadline: new DateService(deadline).getPayloadDateFormat(),
			},
		});
	}

	const Header = (
		<PageHeader
			title={cn(
				activeStepIndex === 0 && APP_TEXT.customise,
				activeStepIndex === 1 && APP_TEXT.selectCurrency,
				activeStepIndex === 2 && APP_TEXT.enterTargetAmount,
			)}
			handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			backPath={APP_PATH.goalList}
			stepsCount={3}
			activeStepIndex={activeStepIndex}
		/>
	);

	return (
		<>
			{activeStepIndex !== initialStepIndex && Header}

			<div className='flex-grow'>
				{activeStepIndex === initialStepIndex && (
					<>
						<GoalImageField isCreatePage>{Header}</GoalImageField>
						<div className='mt-4 px-4'>
							<TextField value={name} onChange={setName} maxLength={25} placeholder={APP_TEXT.goalName} />
						</div>
						{!name && (
							<div className={cn('flex flex-wrap gap-2 p-4')}>
								{hints.map((hint, index) => (
									<div
										key={hint + index}
										className='w-fit cursor-pointer rounded-2xl bg-secondary-violet px-2.5 py-1.5 text-sm text-primary-violet'
										onClick={() => setName(hint)}
									>
										{hint}
									</div>
								))}
							</div>
						)}
					</>
				)}

				{activeStepIndex === 1 && (
					<div className='px-4'>
						<SelectWithSearch
							options={currencyOptions}
							onChange={(value) => {
								setCurrency(value);
								setTargetAmount(initialTargetAmount);
							}}
							value={currency}
						/>
					</div>
				)}

				{activeStepIndex === 2 && (
					<div key={activeStepIndex} className='px-4'>
						<AmountField value={targetAmount} onChange={setTargetAmount} activeOption={activeOption} />
						<div className='mt-4 flex items-center px-4 text-sm'>
							<div className='w-full justify-between font-medium text-primary-grey'>{APP_TEXT.deadline}</div>
							<DatePicker value={deadline} onChange={setDeadline} />
						</div>
					</div>
				)}
			</div>

			<div className={cn('p-4', activeStepIndex === 2 && 'flex gap-2', !isMobile && 'w-96 self-center')}>
				<Button
					type={ButtonType.main}
					onClick={activeStepIndex === 2 ? handleCreateClick : () => setActiveStepIndex(activeStepIndex + 1)}
					disabled={
						(activeStepIndex === 0 && name === initialName) ||
						(activeStepIndex === 2 && targetAmount === initialTargetAmount)
					}
					isLoading={isCreateGoalLoading}
				>
					{activeStepIndex === 2 ? APP_TEXT.create : APP_TEXT.continue}
				</Button>
			</div>

			<StatusPopup
				isOpen={isCreateGoalSuccess}
				status='success'
				statusTextKey='createGoalSuccess'
				statusTextProps={{goalName: name}}
			/>
			<StatusPopup
				isOpen={isCreateGoalError}
				status='error'
				statusTextKey='createGoalError'
				statusTextProps={{goalName: name}}
			/>
		</>
	);
}
