import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {goalNameMaxLength} from '@widgets/goal/util';
import {GoalModel} from '@entities/goal';
import {Card, EditButtonField, LoadingWrapper, StatusPopup} from '@shared/ui';
import {APP_TEXT, CURRENCY, CURRENCY_CODE, CURRENCY_OPTIONS, CURRENCY_SYMBOL} from '@shared/constants';
import {DateService, isNull, TextHelpers} from '@shared/lib';

export function GoalEditDetails() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {updateGoal, isUpdateGoalPending, isUpdateGoalSuccess, isUpdateGoalError} = GoalModel.useUpdateItem();

	const [name, setName] = useState('');
	const [targetAmount, setTargetAmount] = useState<string>('');
	const [deadline, setDeadline] = useState<Date | null>(null);
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);

	const [initialState, setInitialState] = useState<any>({});

	useEffect(() => {
		if (!goalDetails) return;

		const initialState = {
			name: goalDetails.name,
			targetAmount: String(goalDetails.targetAmount),
			deadline: goalDetails.deadline ? new DateService(goalDetails.deadline).value : null,
			currency: goalDetails.balance.currency,
		};

		setInitialState(initialState);

		setName(initialState.name);
		setTargetAmount(initialState.targetAmount);
		setDeadline(initialState.deadline);
		setCurrency(initialState.currency);
	}, [goalDetails]);

	function handleUpdate() {
		if (!id) return;

		updateGoal({
			params: {
				id,
			},
			payload: {
				name,
				targetAmount: Number(targetAmount),
				deadline: deadline ? new DateService(deadline).getPayloadDateFormat() : undefined,
				currency,
			},
		});
	}

	const editButtonCommonProps = {
		isPending: isUpdateGoalPending,
		isSuccess: isUpdateGoalSuccess,
		isError: isUpdateGoalError,
		handleUpdate,
	};

	const isDeadlineChanged = (() => {
		if (isNull(goalDetails?.deadline) && isNull(deadline)) {
			return false;
		}

		if (isNull(goalDetails?.deadline) && !isNull(deadline)) {
			return true;
		}

		if (!isNull(goalDetails?.deadline) && isNull(deadline)) {
			return true;
		}

		if (!!goalDetails?.deadline && !!deadline) {
			return !new DateService(goalDetails?.deadline).isEqualTo(deadline);
		}

		return false;
	})();

	return (
		<>
			<Card>
				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>{APP_TEXT.name}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<EditButtonField<string>
							type='text'
							title={APP_TEXT.name}
							initialValue={initialState.name}
							value={name}
							onChange={setName}
							isChanged={goalDetails?.name !== name.trim()}
							isRequired
							maxLength={goalNameMaxLength}
							{...editButtonCommonProps}
						>
							{goalDetails?.name}
						</EditButtonField>
					</LoadingWrapper>
				</div>

				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>{APP_TEXT.currency}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<EditButtonField<CURRENCY>
							type='select'
							title={APP_TEXT.currency}
							initialValue={initialState.currency}
							value={currency}
							onChange={setCurrency}
							options={CURRENCY_OPTIONS}
							isChanged={goalDetails?.balance.currency !== currency}
							isRequired
							{...editButtonCommonProps}
						>
							{goalDetails && CURRENCY_CODE[goalDetails.balance.currency]}
						</EditButtonField>
					</LoadingWrapper>
				</div>

				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>{APP_TEXT.targetAmount}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<EditButtonField<string>
							type='amount'
							title={APP_TEXT.targetAmount}
							initialValue={initialState.targetAmount}
							value={targetAmount}
							onChange={setTargetAmount}
							isChanged={String(goalDetails?.targetAmount) !== targetAmount}
							activeOption={
								goalDetails && {
									name: CURRENCY_CODE[goalDetails.balance.currency],
									currency: goalDetails.balance.currency,
								}
							}
							icon={!goalDetails?.targetAmount ? 'add' : undefined}
							{...editButtonCommonProps}
						>
							{goalDetails?.targetAmount ? (
								<span>
									{goalDetails?.targetAmount && TextHelpers.getAmount(goalDetails.targetAmount)}{' '}
									{goalDetails && CURRENCY_SYMBOL[goalDetails.balance.currency]}
								</span>
							) : (
								APP_TEXT.addTargetAmount
							)}
						</EditButtonField>
					</LoadingWrapper>
				</div>

				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>{APP_TEXT.deadline}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<EditButtonField<Date | null>
							type='date'
							title={APP_TEXT.deadline}
							initialValue={initialState.deadline}
							value={deadline}
							onChange={setDeadline}
							isChanged={isDeadlineChanged}
							icon={!goalDetails?.deadline ? 'add' : undefined}
							minDate={new DateService().getTomorrowDate()}
							{...editButtonCommonProps}
						>
							{goalDetails?.deadline
								? new DateService(goalDetails.deadline).getLocalDateString()
								: APP_TEXT.addDeadline}
						</EditButtonField>
					</LoadingWrapper>
				</div>
			</Card>

			{goalDetails && (
				<StatusPopup
					isOpen={isUpdateGoalSuccess}
					status='success'
					statusTextKey='updateGoalSuccess'
					statusTextProps={{name: goalDetails.name}}
				/>
			)}
			{goalDetails && (
				<StatusPopup
					isOpen={isUpdateGoalError}
					status='error'
					statusTextKey='updateGoalError'
					statusTextProps={{name: goalDetails.name}}
				/>
			)}
		</>
	);
}

// type DetailsProps = {
// 	details: any;
// 	detailsFields: {
// 		label: string;
// 		key: string;
// 		type?: 'text' | 'custom';
// 		customNode?: ({details, value}: any) => ReactNode;
// 		customValue?: ({details}: any) => ReactNode;
// 		// handler: ({navigate}: {navigate: NavigateFunction}) => void;
// 	}[];
// 	isLoading: boolean;
// };
//
// function getDetailsFields<Details>({handlers}: any) {
// 	return [
// 		{
// 			label: 'name',
// 			key: 'name',
// 			type: 'custom',
// 			customNode: ({value}: any) => (
// 				<Button onClick={handlers.name} icon={<Icon type='edit' className='size-1' />} isOnlyIcon>
// 					{value}
// 				</Button>
// 			),
// 		},
// 		{
// 			label: 'name',
// 			key: 'name',
// 			type: 'button',
// 			customValue: ({details}: {details: Details}) => (
// 				<>
// 					{details?.targetAmount} {details && CURRENCY_SYMBOL[details.balance.currency]}
// 				</>
// 			),
// 		},
// 	] as DetailsProps['detailsFields'];
// }
//
// function Details({details, isLoading, detailsFields}: DetailsProps) {
// 	return detailsFields.map((detailsField, index) => (
// 		<div key={index} className='flex justify-between p-4 text-sm'>
// 			<div className='font-medium text-primary-grey'>{detailsField.label}</div>
//
// 			{detailsField.type === 'button' ? (
// 				<Button onClick={detailsField.handler} icon={<Icon type='edit' className='size-1' />} isOnlyIcon>
// 					{details?.[detailsField.key]}
// 				</Button>
// 			) : (
// 				details?.[detailsField.key]
// 			)}
// 		</div>
// 	));
// }
