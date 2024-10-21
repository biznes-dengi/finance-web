import {useEffect, useState} from 'react';
import {Box, Button, Card, Dialog, Icon, PageHeader, TextField, useDialogState} from '@shared/ui';
import {APP_PATH} from '@shared/constants';
import {useParams} from 'react-router-dom';
import {goalModel} from '@entities/goal';

export function GoalEditPage() {
	const {goalId} = useParams();
	const data = goalModel.useDetails(goalId);

	const {dialogRef, openDialog, closeDialog} = useDialogState();

	const [isNameEditing, setIsNameEditing] = useState(false);
	const [isTargetAmountEditiong, setIsTargetAmountEditiong] = useState(false);
	const [isDeadlineEditing, setIsDeadlineEditing] = useState(false);
	const [isCurrencyEditing, setIsCurrencyEditing] = useState(false);

	const [name, setName] = useState('');
	const [targetAmount, setTargetAmount] = useState<number | undefined>();
	const [deadline, setDeadline] = useState();
	const [currency, setCurrency] = useState();

	useEffect(() => {
		if (!data) return;

		setName(data.name);
		setTargetAmount(data.targetAmount);
	}, [data]);

	return (
		<>
			<Box className='flex h-[290px] flex-col justify-between bg-secondary-grey'>
				<PageHeader title={data?.name} backPath={APP_PATH.root} />
			</Box>

			{/** shit styles margin top see in inspect in browser */}
			<Box basePaddingX className='mb-6'>
				<Card title={'Your goal'}>
					<div className='flex justify-between p-4'>
						<div className='font-medium text-primary-grey'>Name</div>
						<Button onClick={openDialog} icon={Icon.edit}>
							{data?.name}
						</Button>
					</div>
					<div className='flex justify-between p-4'>
						<div className='font-medium text-primary-grey'>Target amount</div>
						<Button onClick={openDialog} icon={Icon.edit}>
							{data?.targetAmount}
						</Button>
					</div>
					<div className='flex justify-between p-4'>
						<div className='font-medium text-primary-grey'>Deadline</div>
						{/*<Button onClick={openDialog} icon={Icon.edit}>*/}
						{/*	{data?.deadline}*/}
						{/*</Button>*/}
					</div>
					<div className='flex justify-between p-4'>
						<div className='font-medium text-primary-grey'>Currency</div>
						{/*<div>Currency edit button</div>*/}
					</div>
				</Card>
			</Box>

			<Dialog ref={dialogRef}>{isNameEditing && <TextField value={name} onChange={setName} />}</Dialog>
		</>
	);
}
