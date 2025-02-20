import {useState} from 'react';
import {GoalImageField} from '@widgets/goal';
import {goalNameMaxLength} from '@widgets/goal/util';
import {GoalModel} from '@entities/goal';
import {AmountField, Button, DatePicker, PageHeader, SelectWithSearch, StatusPopup, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY, CURRENCY_OPTIONS} from '@shared/constants';
import {cn, DateService, useResponsive} from '@shared/lib';

const hints = ['Mustang', 'House', 'Guitar', 'Maldives', 'TV', 'iPhone', 'Education'];

export function GoalCreatePage() {
	const [activeStepIndex, setActiveStepIndex] = useState(0);

	const [name, setName] = useState('');
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);
	const [targetAmount, setTargetAmount] = useState('');
	const [deadline, setDeadline] = useState<Date | null>(null);

	const {createGoal, isCreateGoalPending, isCreateGoalSuccess, isCreateGoalError} = GoalModel.useCreateItem();

	const {isMobile} = useResponsive();

	function handleCreateClick() {
		createGoal({
			payload: {
				name,
				currency,
				targetAmount: Number(targetAmount),
				deadline: deadline ? new DateService(deadline).getPayloadDateFormat() : undefined,
			},
		});
	}

	const Header = (
		<PageHeader
			title={cn(
				activeStepIndex === 0 && APP_TEXT.customise,
				activeStepIndex === 1 && APP_TEXT.selectCurrency,
				activeStepIndex === 2 && APP_TEXT.enterTargetValue,
			)}
			handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			backPath={APP_PATH.goal.list}
			stepsCount={3}
			activeStepIndex={activeStepIndex}
		/>
	);

	return (
		<>
			{activeStepIndex !== 0 && Header}

			<div className='flex-grow'>
				{activeStepIndex === 0 && (
					<>
						<GoalImageField isCreatePage>{Header}</GoalImageField>
						<div className='mt-4 px-4'>
							<TextField
								value={name}
								onChange={setName}
								maxLength={goalNameMaxLength}
								placeholder={APP_TEXT.goalName}
							/>
						</div>
						{!name && (
							<div className={cn('flex flex-wrap gap-2 p-4')}>
								{hints.map((hint, index) => (
									<Button
										type='secondary'
										key={hint + index}
										className='w-fit px-2.5 py-1.5 text-sm'
										onClick={() => setName(hint)}
									>
										{hint}
									</Button>
								))}
							</div>
						)}
					</>
				)}

				{activeStepIndex === 1 && (
					<div className='px-4'>
						<SelectWithSearch
							options={CURRENCY_OPTIONS}
							onChange={(value) => {
								setCurrency(value);
								setTargetAmount('');
							}}
							value={currency}
						/>
					</div>
				)}

				{activeStepIndex === 2 && (
					<div key={activeStepIndex} className='px-4'>
						<AmountField
							value={targetAmount}
							onChange={setTargetAmount}
							activeOption={{
								name: CURRENCY_OPTIONS.find((option) => option.value === currency)?.description ?? '',
								currency: currency as CURRENCY,
							}}
						/>
						<div className='mt-4 flex justify-between px-4 text-sm'>
							<div className='font-medium text-primary-grey'>{APP_TEXT.deadline}</div>
							<DatePicker
								onChange={setDeadline}
								value={deadline}
								minDate={new DateService().getTomorrowDate()}
								title={APP_TEXT.deadline}
							>
								{deadline ? new DateService(deadline).getLocalDateString() : APP_TEXT.addDeadline}
							</DatePicker>
						</div>
					</div>
				)}
			</div>

			<div className={cn('p-4', !isMobile && 'w-96 self-center')}>
				<Button
					type='primary'
					onClick={activeStepIndex === 2 ? handleCreateClick : () => setActiveStepIndex(activeStepIndex + 1)}
					disabled={(activeStepIndex === 0 && !name) || (activeStepIndex === 2 && !targetAmount)}
					isPending={isCreateGoalPending}
				>
					{activeStepIndex === 2 ? APP_TEXT.create : APP_TEXT.continue}
				</Button>
			</div>

			<StatusPopup
				isOpen={isCreateGoalSuccess}
				status='success'
				statusTextKey='createGoalSuccess'
				statusTextProps={{name}}
			/>
			<StatusPopup isOpen={isCreateGoalError} status='error' statusTextKey='createGoalError' statusTextProps={{name}} />
		</>
	);
}
