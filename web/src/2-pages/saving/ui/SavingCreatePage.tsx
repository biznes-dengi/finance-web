import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {
	Box,
	Button,
	ButtonType,
	Dialog,
	Icon,
	NumericInputWithOptions,
	PageHeader,
	SelectWithSearch,
	Spinner,
	Stepper,
	TextField,
	useUploadField,
	useDialogState,
} from '@shared/ui';

import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';
import {cn} from '@shared/lib';

const hints = ['Mustang', 'House', 'Guitar', 'Maldives', 'TV', 'iPhone 17', 'Book'];

const currencyOptions = [
	{description: 'PLN', symbol: 'zł', name: 'Polish Zloty', value: CURRENCY.PLN},
	{description: 'USD', symbol: '$', name: 'US Dollar', value: CURRENCY.USD},
	{description: 'BYN', symbol: 'byn', name: 'BLR rubel', value: CURRENCY.BYN},
	{description: 'EUR', symbol: 'eur', name: 'Euro', value: CURRENCY.EUR},
	{description: 'GBP', symbol: 'gbp', name: 'British pound', value: CURRENCY.GBP},
];

const initialStepIndex = 0;
const initialName = '';
const initialCurrencyValue = null;
const initialTargetAmount = undefined;

export function SavingCreatePage() {
	const navigate = useNavigate();

	const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex);

	/** Form state */
	const [name, setName] = useState(initialName);
	const [currencyValue, setCurrencyValue] = useState<CURRENCY | null>(initialCurrencyValue);
	const selectedCurrencyOption = currencyOptions.find((option) => option.value === currencyValue);
	const [targetAmount, setTargetAmount] = useState<number | undefined>(initialTargetAmount);

	function handleCurrencyValueChange(value: CURRENCY) {
		setCurrencyValue(value);
		setTargetAmount(initialTargetAmount);
	}

	const {dialogRef, openDialog, closeDialog} = useDialogState();

	const {UploadField, startUploading, abortUploading, uploadProgressPercent, isUploading, isFileDragging} =
		useUploadField();

	const Header = (
		<PageHeader
			handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			backPath={APP_PATH.root}
		/>
	);

	return (
		<>
			{activeStepIndex === initialStepIndex ? (
				<UploadField onUpload={alert}>
					<div
						className={cn(
							'flex h-[290px] flex-col items-end justify-between rounded-b-2xl bg-secondary-grey',
							isUploading && 'bg-secondary-grey',
						)}
					>
						{Header}

						{isFileDragging && <div className='h-10 w-10 self-center text-primary-violet'>{Icon.uploadImage}</div>}
						{isUploading && (
							<div className='cursor-default self-center text-center'>
								<div className='mb-4 font-semibold text-primary-violet'>{uploadProgressPercent}%</div>
								<div className='cursor-pointer text-sm underline hover:text-primary-violet' onClick={abortUploading}>
									Cancel uploading
								</div>
							</div>
						)}

						<div
							className='z-10 mb-4 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-violet text-white shadow-[0_0_0_4px_white_inset]'
							onClick={startUploading}
						>
							{!isUploading ? Icon.camera : <Spinner className='z-20 h-5 w-5' />}
						</div>
					</div>
				</UploadField>
			) : (
				Header
			)}

			<div className='flex-grow'>
				<Stepper
					activeStepIndex={activeStepIndex}
					steps={[
						<>
							<Box basePaddingX>
								<TextField value={name} onChange={setName} maxLength={25} placeholder={APP_TEXT.goalName} />
							</Box>
							{!name && (
								<Box basePaddingX className={cn('flex flex-wrap gap-2 pt-4')}>
									{hints.map((hint, index) => (
										<div
											key={hint + index}
											className={cn('w-fit cursor-pointer rounded-2xl bg-secondary-grey px-2 py-0.5 text-sm')}
											onClick={() => setName(hint)}
										>
											{hint}
										</div>
									))}
								</Box>
							)}
						</>,
						<Box key={activeStepIndex} basePaddingX>
							<SelectWithSearch options={currencyOptions} onChange={handleCurrencyValueChange} value={currencyValue} />
						</Box>,
						<Box key={activeStepIndex} basePaddingX>
							<NumericInputWithOptions
								value={targetAmount}
								onChange={setTargetAmount}
								options={[
									{
										name: selectedCurrencyOption?.description ?? '',
										balance: {currency: CURRENCY.USD, amount: 1},
									},
								]}
								getLabel={() => APP_TEXT.amount}
							/>
						</Box>,
					]}
				/>
			</div>

			<Box basePaddingX mediumMarginY>
				<Button
					onClick={
						activeStepIndex === 2
							? () => {
									openDialog();
									setTimeout(closeDialog, 2000);
									setTimeout(() => navigate(APP_PATH.goalDetails), 2500);
							  }
							: () => setActiveStepIndex(activeStepIndex + 1)
					}
					type={ButtonType.main}
					disabled={(() => {
						if (activeStepIndex === 0) return name === initialName;
						if (activeStepIndex === 1) return currencyValue === initialCurrencyValue;
						if (activeStepIndex === 2) return targetAmount === initialTargetAmount;
					})()}
				>
					{activeStepIndex === 2 ? APP_TEXT.create : APP_TEXT.continue}
				</Button>
			</Box>

			<Dialog ref={dialogRef} isCloseDisabled withAutoClose>
				<div className='flex flex-col items-center pb-4'>
					<div className='mb-4 h-10 w-10 pb-4 text-primary-violet'>{Icon.check}</div>
					<div className='text-center font-semibold'>
						{APP_TEXT.goal}
						<span className='text-primary-violet'>{name}</span>
						{APP_TEXT.createdSuccess}
						{APP_TEXT.createdSuccess}
					</div>
				</div>
			</Dialog>
		</>
	);
}
