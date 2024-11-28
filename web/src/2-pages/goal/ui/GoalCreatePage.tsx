import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
	AppIcon,
	Box,
	Button,
	ButtonType,
	DatePicker,
	Popup,
	Icon,
	NumericInputWithOptions,
	PageHeader,
	SelectWithSearch,
	Spinner,
	Stepper,
	TextField,
	useUploadField,
} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY} from '@shared/constants';
import {cn, DateService} from '@shared/lib';
import {goalModel} from '@entities/goal';

const hints = ['Mustang', 'House', 'Guitar', 'Maldives', 'TV', 'iPhone 17', 'Book'];

const initialStepIndex = 0;
const initialName = '';
const initialTargetAmount = undefined;

const currencyOptions = [{description: 'USD', name: 'US Dollar', value: CURRENCY.USD}];

export function GoalCreatePage() {
	const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex);

	/** Form state */
	const [name, setName] = useState(initialName);
	const [currency, setCurrency] = useState<CURRENCY>(CURRENCY.USD);
	const [targetAmount, setTargetAmount] = useState<number | undefined>(initialTargetAmount);
	const [deadline, setDeadline] = useState<Date>(new DateService().value);

	const {UploadField, startUploading, abortUploading, uploadProgressPercent, isUploading, isFileDragging} =
		useUploadField();

	const {create, isCreatePending, isCreateSuccess, isCreateError} = goalModel.useCreate();

	function handleCreateClick() {
		if (!targetAmount) return;

		const payload = {
			name,
			currency,
			targetAmount,
			deadline: new DateService(deadline).getPayloadDateFormat(),
		};

		create(payload);
	}

	const activeOptionNotMapped = currencyOptions.find((option) => option.value === currency);
	const activeOption = {
		name: activeOptionNotMapped?.description ?? '',
		balance: {
			amount: 0,
			currency: currency as CURRENCY,
		},
	};

	const Header = (
		<PageHeader
			handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			backPath={APP_PATH.goalList}
		/>
	);

	const navigate = useNavigate();

	// if (isCreateSuccess) {
	// 	navigate(getGoalDetailsPath());
	// }

	if (isCreateSuccess || isCreateError) {
		setTimeout(() => {
			navigate(APP_PATH.goalList);
		}, 2000);
	}

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
								<TextField value={name} onChange={setName} maxLength={25} placeholder={APP_TEXT.goalName} isAutoFocus />
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
							<SelectWithSearch
								options={currencyOptions}
								onChange={(value) => {
									setCurrency(value);
									setTargetAmount(initialTargetAmount);
								}}
								value={currency}
							/>
						</Box>,
						<Box key={activeStepIndex} basePaddingX>
							<NumericInputWithOptions
								value={targetAmount}
								onChange={setTargetAmount}
								activeOption={activeOption}
								getLabel={() => APP_TEXT.targetAmount}
							/>
							<Box baseMarginY>
								<Box className='mb-2 font-medium'>Deadline</Box>
								<DatePicker value={deadline} onChange={setDeadline} />
							</Box>
						</Box>,
					]}
				/>
			</div>

			<Box basePaddingX mediumMarginY>
				<Button
					onClick={activeStepIndex === 2 ? handleCreateClick : () => setActiveStepIndex(activeStepIndex + 1)}
					type={ButtonType.main}
					disabled={(() => {
						if (activeStepIndex === 0) return name === initialName;
						if (activeStepIndex === 2) return targetAmount === initialTargetAmount;
					})()}
				>
					{activeStepIndex === 2 ? (isCreatePending ? 'Loading...' : APP_TEXT.create) : APP_TEXT.continue}
				</Button>
			</Box>

			<Popup isStatusDialogOpen={isCreateSuccess || isCreateError}>
				{isCreateSuccess && activeOption && (
					<Box baseMarginY className='text-center'>
						<div className='flex flex-col items-center pb-4'>
							<AppIcon type='check' className='mb-5 size-10 text-primary-violet' />
							<div className='text-center font-semibold'>
								{APP_TEXT.goal} <span className='text-primary-violet'>{name}</span> {APP_TEXT.createdSuccess}
								{APP_TEXT.createdSuccess}
							</div>
							<div className='mt-2'>Welcome to Finansy family 🤗</div>
						</div>
					</Box>
				)}
				{isCreateError && activeOption && (
					<Box baseMarginY className='text-center'>
						<div className='mb-4 flex justify-center'>
							<div className='size-16 text-primary-violet'>{Icon.error}</div>
						</div>
						<div>
							Some error occur during creating <span className='font-medium text-primary-violet'>{name}</span>
						</div>
					</Box>
				)}
			</Popup>
		</>
	);
}
