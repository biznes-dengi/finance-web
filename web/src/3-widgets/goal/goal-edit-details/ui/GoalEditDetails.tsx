import {Card, EditButtonField} from '@shared/ui';
import {APP_TEXT, CURRENCY, CURRENCY_MAP, CURRENCY_SYMBOL} from '@shared/constants';
import {DateService, TextHelpers} from '@shared/lib';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {useEffect, useState} from 'react';

export function GoalEditDetails() {
	const {id} = useParams();

	const {goalDetails} = GoalModel.useItemDetails({id});
	const {updateGoal, isUpdateGoalLoading, isUpdateGoalSuccess} = GoalModel.useUpdateItem();

	const [name, setName] = useState('');
	const [targetAmount, setTargetAmount] = useState<number | null | undefined>();
	const [deadline, setDeadline] = useState<Date>();
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);

	useEffect(() => {
		if (!goalDetails) return;

		setName(goalDetails.name);
		setTargetAmount(goalDetails.targetAmount);
		setDeadline(new Date(goalDetails.deadline as string));
		setCurrency(goalDetails.balance.currency);
	}, [goalDetails]);

	function handleUpdate() {
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
		handleUpdate,
	};

	return (
		<Card>
			<div className='flex justify-between p-4 text-sm'>
				<div className='font-medium text-primary-grey'>Name</div>
				<EditButtonField<string>
					type='text'
					fieldName={APP_TEXT.name}
					value={name}
					onChange={setName}
					{...editButtonCommonProps}
				>
					{goalDetails?.name}
				</EditButtonField>
			</div>
			<div className='flex justify-between p-4 text-sm'>
				<div className='font-medium text-primary-grey'>Target amount</div>
				<EditButtonField<number | null | undefined>
					type='amount'
					fieldName={APP_TEXT.targetAmount}
					value={targetAmount}
					onChange={setTargetAmount}
					{...editButtonCommonProps}
				>
					<span>
						{goalDetails?.targetAmount && TextHelpers.getAmount(goalDetails.targetAmount)}{' '}
						{goalDetails && CURRENCY_SYMBOL[goalDetails.balance.currency]}
					</span>
				</EditButtonField>
			</div>
			<div className='flex justify-between p-4 text-sm'>
				<div className='font-medium text-primary-grey'>Deadline</div>
				<EditButtonField<Date | undefined>
					type='date'
					fieldName={APP_TEXT.deadline}
					value={deadline}
					onChange={setDeadline}
					{...editButtonCommonProps}
				>
					{new DateService(deadline).getLocalDateString()}
				</EditButtonField>
			</div>
			<div className='flex justify-between p-4 text-sm'>
				<div className='font-medium text-primary-grey'>Currency</div>
				<EditButtonField<CURRENCY>
					type='select'
					fieldName={APP_TEXT.currency}
					value={currency}
					onChange={setCurrency}
					options={[{description: 'USD', name: 'US Dollar', value: CURRENCY.USD}]}
					{...editButtonCommonProps}
				>
					{goalDetails && CURRENCY_MAP[goalDetails.balance.currency].code}
				</EditButtonField>
			</div>
		</Card>
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
