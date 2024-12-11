import {useEffect, useState} from 'react';
import {
	Box,
	Button,
	ButtonType,
	Card,
	Icon,
	Item,
	NumericInput,
	PageHeader,
	Popup,
	SelectWithSearch,
	TextField,
	usePopupState,
} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY, CURRENCY_MAP} from '@shared/constants';
import {useParams} from 'react-router-dom';
import {GoalModel} from '@entities/goal';
import {cn, DateService, isNull} from '@shared/lib';
import {Calendar} from '@shared/ui/date-picker/ui/Calendar.tsx';

export function GoalEditPage() {
	//@ts-ignore
	const {id} = useParams() as {id: number};

	const {goalDetails: data} = GoalModel.useItemDetails({id});

	const {isUpdateItemLoading, updateItem} = GoalModel.useUpdateItem();
	const {deleteItem, isDeleteItemLoading} = GoalModel.useDeleteItem();

	const {dialogRef: nameDialogRef, openDialog: openNameDialog, closeDialog: closeNameDialog} = usePopupState();
	const {
		dialogRef: targetAmountDialogRef,
		openDialog: openTargetAmountDialog,
		closeDialog: closeTargetAmountDialog,
	} = usePopupState();
	const {
		dialogRef: deadlineDialogRef,
		openDialog: openDeadlineDialog,
		closeDialog: closeDialogDialog,
	} = usePopupState();
	const {
		dialogRef: currencyDialogRef,
		openDialog: openCurrencyDialog,
		closeDialog: closeCurrencyDialog,
	} = usePopupState();

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

		updateItem({params: {id}, payload});

		closeNameDialog();
		closeTargetAmountDialog();
		closeDialogDialog();
		closeCurrencyDialog();
	}

	// выполняется всегда после первого edit
	// if (isUpdateItemSuccess || isUpdateItemError) {
	// 	closeNameDialog();
	// 	closeTargetAmountDialog();
	// 	closeDialogDialog();
	// 	closeCurrencyDialog();
	// }

	return (
		<>
			<Box className='flex h-[290px] flex-col justify-between bg-secondary-grey'>
				<PageHeader title={data?.name} backPath={APP_PATH.goal.getItemDetailsPath(id)} />
			</Box>

			{/** shit styles margin top see in inspect in browser */}
			<Box basePaddingX>
				<Card title={'Your goal'}>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Name</div>
						<Button onClick={openNameDialog} icon={<Icon type='edit' className='size-1' />} isOnlyIcon>
							{data?.name}
						</Button>
						<Popup ref={nameDialogRef}>
							<Box className='mb-4 text-xl font-medium'>Edit name</Box>
							<TextField value={name} onChange={setName} placeholder='Name' />
							<Box baseMarginY>
								<Button onClick={handleEdit} type={ButtonType.main}>
									{isUpdateItemLoading ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Popup>
					</div>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Target amount</div>
						<Button onClick={openTargetAmountDialog} icon={<Icon type='edit' />}>
							{data?.targetAmount} {data && CURRENCY_MAP[data.balance.currency].symbol}
						</Button>
						<Popup ref={targetAmountDialogRef}>
							<Box className='mb-4 text-xl font-medium'>Edit target amount</Box>
							<NumericInput
								value={isNull(targetAmount) ? undefined : targetAmount}
								onChange={setTargetAmount}
								placeholder='Target amount'
							/>
							<Box baseMarginY>
								<Button onClick={handleEdit} type={ButtonType.main}>
									{isUpdateItemLoading ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Popup>
					</div>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Deadline</div>
						<Button onClick={openDeadlineDialog} icon={<Icon type='calendar' />}>
							{new DateService(deadline).getLocalDateString()}
						</Button>
						<Popup ref={deadlineDialogRef}>
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
									{isUpdateItemLoading ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Popup>
					</div>
					<div className='flex justify-between p-4 text-sm'>
						<div className='font-medium text-primary-grey'>Currency</div>
						<Button onClick={openCurrencyDialog} icon={<Icon type='edit' />}>
							{data && CURRENCY_MAP[data.balance.currency].code}
						</Button>
						<Popup ref={currencyDialogRef}>
							<Box className='mb-4 text-xl font-medium'>Edit currency</Box>
							<SelectWithSearch
								options={[{description: 'USD', name: 'US Dollar', value: CURRENCY.USD}]}
								onChange={setCurrency}
								value={currency}
							/>
							<Box baseMarginY>
								<Button onClick={handleEdit} type={ButtonType.main}>
									{isUpdateItemLoading ? 'Loading...' : 'Save'}
								</Button>
							</Box>
						</Popup>
					</div>
				</Card>
			</Box>
			<Box basePadding>
				{/* TODO goal has been deleted successfully drawer */}
				<Item
					name={isDeleteItemLoading ? 'Loading...' : APP_TEXT.deleteGoal}
					className={cn('text-sm text-red-600', isDeleteItemLoading && 'text-primary-grey')}
					onClick={() => deleteItem({params: {id}})}
				/>
			</Box>
		</>
	);
}
