import {useEffect, useState} from 'react';
import {MoneyActionPageHelpers} from '../lib/MoneyActionPage.helpers.ts';
import {TransferPageProps} from '../types/MoneyActionPage.types.ts';
import {
	AmountField,
	AmountFieldOption,
	Button,
	ButtonType,
	EditButtonField,
	Icon,
	PageHeader,
	StatusPopup,
} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';
import {cn, DateService, isEqual, useResponsive} from '@shared/lib';

export function TransferPage(props: TransferPageProps) {
	const {
		itemDetails,
		items,
		isItemDataLoading,
		transfer,
		isTransferLoading,
		isTransferSuccess,
		isTransferError,
		successTextKey,
		errorTextKey,
		backPath,
	} = props;

	const {isMobile} = useResponsive();

	const [fromActiveOption, setFromActiveOption] = useState<AmountFieldOption | null>(null);
	const [toActiveOption, setToActiveOption] = useState<AmountFieldOption | null>(null);
	const [options, setOptions] = useState<AmountFieldOption[] | undefined>([]);

	const [fromGoalAmount, setFromGoalAmount] = useState('');
	const [toGoalAmount, setToGoalAmount] = useState('');
	const [shouldChangeToGoalAmount, setShouldChangeToGoalAmount] = useState(true);

	const [date, setDate] = useState<Date>(new Date());

	useEffect(() => {
		if (items && itemDetails) {
			setFromActiveOption(MoneyActionPageHelpers.mapItemDataToOption(itemDetails));

			const options = items
				.filter((item) => item.id !== itemDetails.id)
				.map(MoneyActionPageHelpers.mapItemDataToOption);

			setOptions(options);
			setToActiveOption(options[0]);
		}

		if (items && !itemDetails) {
			setOptions(items.map(MoneyActionPageHelpers.mapItemDataToOption));
			setFromActiveOption(MoneyActionPageHelpers.mapItemDataToOption(items[0]));
			setToActiveOption(MoneyActionPageHelpers.mapItemDataToOption(items[1]));
		}
	}, [itemDetails, items]);

	function handleTransferClick() {
		if (!fromActiveOption || !toActiveOption || !fromGoalAmount || !toGoalAmount) return;

		transfer({
			payload: {
				fromItemId: fromActiveOption.id!,
				toItemId: toActiveOption.id!,
				fromItemAmount: Number(fromGoalAmount),
				toItemAmount: Number(toGoalAmount),
				date: new DateService(date).getPayloadDateFormat(),
			},
		});
	}

	const isFromAmountError =
		!!fromGoalAmount && !!fromActiveOption && Number(fromGoalAmount) > Number(fromActiveOption.amount);

	return (
		<>
			<PageHeader title={APP_TEXT.transfer} backPath={backPath} />

			<div className='flex-1 px-4'>
				<div className='relative flex flex-col gap-2'>
					<AmountField
						value={fromGoalAmount}
						onChange={(value) => {
							setFromGoalAmount(value);
							if (shouldChangeToGoalAmount) {
								setToGoalAmount(value);
							}
						}}
						activeOption={fromActiveOption}
						setActiveOption={(activeOption) => {
							setFromActiveOption(activeOption);
							if (isEqual(activeOption.id, toActiveOption?.id)) {
								setToActiveOption(fromActiveOption);
							}
						}}
						options={itemDetails ? undefined : options}
						errorText={isFromAmountError && 'exceeds balance'}
						isLoading={isItemDataLoading}
						withMinus
					/>

					<div
						className={cn(
							'absolute left-[50%] top-[50%] flex size-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white transition-all duration-300',
						)}
					>
						<Icon type='transferTo' className='size-4 text-primary-violet' />
					</div>

					<AmountField
						value={toGoalAmount}
						onChange={(value) => {
							value ? setShouldChangeToGoalAmount(false) : setShouldChangeToGoalAmount(true);
							setToGoalAmount(value);
						}}
						activeOption={toActiveOption}
						setActiveOption={(activeOption) => {
							if (isEqual(activeOption.id, fromActiveOption?.id)) {
								setFromActiveOption(toActiveOption);
							}
							setToActiveOption(activeOption);
						}}
						options={options}
						isLoading={isItemDataLoading}
						withPlus
						isAutoFocusDisabled
					/>
				</div>

				<div className='my-4 flex flex-col gap-2'>
					<div className='mt-4 flex justify-between text-sm'>
						<div className='font-medium text-primary-grey'>{APP_TEXT.transactionDate}</div>
						<EditButtonField<Date | undefined>
							type='date'
							title={APP_TEXT.transactionDate}
							initialValue={undefined}
							value={date}
							onChange={(value) => {
								if (!value) return;
								setDate(value);
							}}
							isChanged={!new DateService(new DateService().value).isEqualTo(date)}
							isNotEdit
						>
							{new DateService(date).getLocalDateString()}
						</EditButtonField>
					</div>
				</div>
			</div>

			<div className={cn('p-4', !isMobile && 'w-96 self-center')}>
				<Button
					type={ButtonType.main}
					onClick={handleTransferClick}
					disabled={!fromGoalAmount || !toGoalAmount || isFromAmountError}
					isLoading={isTransferLoading}
				>
					{APP_TEXT.transfer}
				</Button>
			</div>

			<StatusPopup isOpen={isTransferSuccess} status='success' statusTextKey={successTextKey} />
			<StatusPopup isOpen={isTransferError} status='error' statusTextKey={errorTextKey} />
		</>
	);
}
