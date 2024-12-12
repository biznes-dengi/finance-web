import {Card, EditButtonField, LoadingWrapper, StatusPopup} from '@shared/ui';
import {APP_TEXT, CURRENCY, CURRENCY_MAP, CURRENCY_SYMBOL} from '@shared/constants';
import {DateService, TextHelpers} from '@shared/lib';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {useEffect, useState} from 'react';

export function GoalEditDetails() {
	const {id} = useParams();

	const {goalDetails, isGoalDetailsLoading} = GoalModel.useItemDetails({id});
	const {updateGoal, isUpdateGoalLoading, isUpdateGoalSuccess, isUpdateGoalError} = GoalModel.useUpdateItem();

	const [name, setName] = useState('');
	const [targetAmount, setTargetAmount] = useState<string>('');
	const [deadline, setDeadline] = useState<Date>();
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);

	useEffect(() => {
		if (!goalDetails) return;

		setName(goalDetails.name);
		setTargetAmount(String(goalDetails.targetAmount));
		setDeadline(new Date(goalDetails.deadline as string));
		setCurrency(goalDetails.balance.currency);
	}, [goalDetails]);

	function handleUpdate() {
		// TODO: сравнивать что isChanged, заносить text в стейт в зависимости от этого и отображать его в status popup

		const payload = {
			name,
			targetAmount,
			deadline: new DateService(deadline).getPayloadDateFormat(),
			currency,
		};

		updateGoal({params: {id}, payload});
	}

	const editButtonCommonProps = {
		isLoading: isUpdateGoalLoading,
		isSuccess: isUpdateGoalSuccess,
		isError: isUpdateGoalError,
		handleUpdate,
	};

	return (
		<>
			<Card>
				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>Name</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<EditButtonField<string>
							type='text'
							fieldName={APP_TEXT.name}
							value={name}
							onChange={setName}
							isChanged={goalDetails?.name !== name.trim()}
							{...editButtonCommonProps}
						>
							{goalDetails?.name}
						</EditButtonField>
					</LoadingWrapper>
				</div>
				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>Target amount</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<EditButtonField<string>
							type='amount'
							fieldName={APP_TEXT.targetAmount}
							value={targetAmount}
							onChange={setTargetAmount}
							isChanged={String(goalDetails?.targetAmount) !== targetAmount}
							{...editButtonCommonProps}
						>
							<span>
								{goalDetails?.targetAmount && TextHelpers.getAmount(goalDetails.targetAmount)}{' '}
								{goalDetails && CURRENCY_SYMBOL[goalDetails.balance.currency]}
							</span>
						</EditButtonField>
					</LoadingWrapper>
				</div>
				<div className='flex justify-between p-4 text-sm'>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>{APP_TEXT.deadline}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isGoalDetailsLoading} className='mb-1 h-4 w-10'>
						<EditButtonField<Date | undefined>
							type='date'
							fieldName={APP_TEXT.deadline}
							value={deadline}
							onChange={setDeadline}
							isChanged={goalDetails?.deadline !== deadline}
							{...editButtonCommonProps}
						>
							{new DateService(deadline).getLocalDateString()}
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
							fieldName={APP_TEXT.currency}
							value={currency}
							onChange={setCurrency}
							options={[{description: 'USD', name: 'US Dollar', value: CURRENCY.USD}]}
							isChanged={goalDetails?.balance.currency !== currency}
							{...editButtonCommonProps}
						>
							{goalDetails && CURRENCY_MAP[goalDetails.balance.currency].code}
						</EditButtonField>
					</LoadingWrapper>
				</div>
			</Card>

			<StatusPopup isOpen={isUpdateGoalSuccess} status='success' statusTextKey='goalUpdateSuccess' />
			<StatusPopup isOpen={isUpdateGoalError} status='error' statusTextKey='goalDeleteError' />
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
