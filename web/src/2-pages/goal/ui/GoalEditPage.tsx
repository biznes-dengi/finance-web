import {useEffect, useState} from 'react';
import {
	Box,
	Button,
	ButtonType,
	Card,
	Dialog,
	Icon,
	Item,
	NumericInput,
	PageHeader,
	SelectWithSearch,
	TextField,
	useDialogState,
} from '@shared/ui';
import {APP_TEXT, CURRENCY, CURRENCY_MAP} from '@shared/constants';
import {useParams} from 'react-router-dom';
import {goalModel} from '@entities/goal';
import {getGoalDetailsPath} from '@shared/constants/appPath.constant.ts';
import {cn, DateService, isNull} from '@shared/lib';
import {Calendar} from '@shared/ui/date-picker/ui/Calendar.tsx';

export function GoalEditPage() {
	const {goalId} = useParams();
	const {goalDetails: data} = goalModel.useDetails(goalId);

	const {isEditPending, editGoal} = goalModel.useEdit();
	const {deleteGoal, isDeletePending} = goalModel.useDelete();

	const {dialogRef: nameDialogRef, openDialog: openNameDialog, closeDialog: closeNameDialog} = useDialogState();
	const {
		dialogRef: targetAmountDialogRef,
		openDialog: openTargetAmountDialog,
		closeDialog: closeTargetAmountDialog,
	} = useDialogState();
	const {
		dialogRef: deadlineDialogRef,
		openDialog: openDeadlineDialog,
		closeDialog: closeDialogDialog,
	} = useDialogState();
	const {
		dialogRef: currencyDialogRef,
		openDialog: openCurrencyDialog,
		closeDialog: closeCurrencyDialog,
	} = useDialogState();

	const [name, setName] = useState('');
	const [targetAmount, setTargetAmount] = useState<number | null | undefined>();
	const [deadline, setDeadline] = useState<Date>();
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);

	useEffect(() => {
		if (!data) return;

		setName(data.name);
		setTargetAmount(data.targetAmount);
		setDeadline(new Date(data.deadline as string));
		setCurrency(data.balance.currency);
	}, [data]);

	function handleEdit() {
		const payload = {
			name,
			targetAmount,
			deadline: new DateService(deadline).getPayloadDateFormat(),
			currency,
		};

		editGoal({goalId, payload});

		closeNameDialog();
		closeTargetAmountDialog();
		closeDialogDialog();
		closeCurrencyDialog();
	}

	// выполняется всегда после первого edit
	// if (isEditSuccess || isEditError) {
	// 	closeNameDialog();
	// 	closeTargetAmountDialog();
	// 	closeDialogDialog();
	// 	closeCurrencyDialog();
	// }

	return (
		<>
			<Box className='flex h-[290px] flex-col justify-between bg-secondary-grey'>
				<PageHeader title={data?.name} backPath={getGoalDetailsPath(goalId)} />
			</Box>

			{/** shit styles margin top see in inspect in browser */}
			<Box basePaddingX>
				<Card title={'Your goal'} withTitleSpace>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Name</div>
						<Button onClick={openNameDialog} icon={Icon.edit}>
							{data?.name}
						</Button>
						<Dialog ref={nameDialogRef}>
							<Box className='mb-4 text-xl font-medium'>Edit name</Box>
							<TextField value={name} onChange={setName} placeholder='Name' />
							<Box baseMarginY>
								<Button onClick={handleEdit} type={ButtonType.main}>
									{isEditPending ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Dialog>
					</div>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Target amount</div>
						<Button onClick={openTargetAmountDialog} icon={Icon.edit}>
							{data?.targetAmount}
						</Button>
						<Dialog ref={targetAmountDialogRef}>
							<Box className='mb-4 text-xl font-medium'>Edit target amount</Box>
							<NumericInput
								value={isNull(targetAmount) ? undefined : targetAmount}
								onChange={setTargetAmount}
								placeholder='Target amount'
							/>
							<Box baseMarginY>
								<Button onClick={handleEdit} type={ButtonType.main}>
									{isEditPending ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Dialog>
					</div>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Deadline</div>
						<Button onClick={openDeadlineDialog} icon={Icon.calendar}>
							{new DateService(deadline).getLocalDateString()}
						</Button>
						<Dialog ref={deadlineDialogRef}>
							<Box className='mb-4 text-xl font-medium'>Edit deadline</Box>
							<div className='flex w-full justify-center'>
								<Calendar
									mode='single'
									selected={deadline}
									onSelect={(date) => {
										if (!date) return;
										setDeadline(date);
									}}
								/>
							</div>
							<Box baseMarginY>
								<Button onClick={handleEdit} type={ButtonType.main}>
									{isEditPending ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Dialog>
					</div>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Currency</div>
						<Button onClick={openCurrencyDialog} icon={Icon.edit}>
							{data && CURRENCY_MAP[data.balance.currency].code}
						</Button>
						<Dialog ref={currencyDialogRef}>
							<Box className='mb-4 text-xl font-medium'>Edit currency</Box>
							<SelectWithSearch
								options={[{description: 'USD', name: 'US Dollar', value: CURRENCY.USD}]}
								onChange={setCurrency}
								value={currency}
							/>
							<Box baseMarginY>
								<Button onClick={handleEdit} type={ButtonType.main}>
									{isEditPending ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Dialog>
					</div>
				</Card>
			</Box>
			<Box basePadding>
				<Item
					name={isDeletePending ? 'Loading...' : APP_TEXT.deleteGoal}
					className={cn('text-sm text-red-600', isDeletePending && 'text-primary-grey')}
					onClick={() => deleteGoal({id: Number(goalId)})}
				/>
			</Box>
		</>
	);
}
