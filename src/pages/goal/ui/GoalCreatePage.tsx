import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {
	APP_ICON,
	Box,
	Button,
	BUTTON_TYPE,
	NumericField,
	PageHeader,
	Select,
	Stepper,
	TextField,
	useDrawer,
} from '@shared/ui';

import {APP_PATH, APP_TEXT} from '@shared/config';
import {CURRENCY} from '@shared/constants';
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

export function GoalCreatePage() {
	const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex);

	/** Form state */
	const [name, setName] = useState(initialName);
	const [currencyValue, setCurrencyValue] = useState<CURRENCY | null>(initialCurrencyValue);
	const [targetAmount, setTargetAmount] = useState<number | undefined>(initialTargetAmount);

	const {openDrawer, Drawer} = useDrawer();

	const navigate = useNavigate();

	const selectedCurrencyOption = currencyOptions.find((option) => option.value === currencyValue);

	function handleCurrencyValueChange(value: CURRENCY) {
		setCurrencyValue(value);
		setTargetAmount(initialTargetAmount);
	}

	return (
		<>
			<div
				role='image-wrapper'
				className='flex h-[290px] flex-col items-end justify-between rounded-b-2xl bg-secondary-grey'
			>
				<PageHeader
					handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
				/>

				{activeStepIndex === initialStepIndex && (
					<div
						className='z-10 mb-4 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-violet text-white shadow-[0_0_0_4px_white_inset]'
						onClick={() => alert('Upload a photo')}
					>
						{APP_ICON.camera}
					</div>
				)}
			</div>

			<div className='flex-grow'>
				<Stepper
					activeStepIndex={activeStepIndex}
					steps={[
						<>
							<Box withBaseHorizontal>
								<TextField value={name} onChange={setName} maxLength={25} placeholder='Goal name' />
							</Box>
							{!name && (
								<Box withBaseHorizontal className={cn('flex flex-wrap pt-4')}>
									{hints.map((hint, index) => (
										<div
											key={hint + index}
											className={cn('mb-2 mr-2 w-fit rounded-2xl bg-secondary-grey px-2 py-0.5 text-sm')}
											onClick={() => setName(hint)}
										>
											{hint}
										</div>
									))}
								</Box>
							)}
						</>,
						<Box key={activeStepIndex} withBaseHorizontal>
							<Select options={currencyOptions} onChange={handleCurrencyValueChange} value={currencyValue} />
						</Box>,
						<Box key={activeStepIndex} withBaseHorizontal>
							<NumericField
								value={targetAmount}
								onChange={setTargetAmount}
								currencyCode={selectedCurrencyOption?.description}
								currencySymbol={selectedCurrencyOption?.symbol}
							/>
						</Box>,
					]}
				/>
			</div>

			<Box withBaseHorizontal withMediumVertical>
				<Button
					onClick={activeStepIndex === 2 ? () => openDrawer() : () => setActiveStepIndex(activeStepIndex + 1)}
					type={BUTTON_TYPE.primary}
					disabled={(() => {
						if (activeStepIndex === 0) return name === initialName;
						if (activeStepIndex === 1) return currencyValue === initialCurrencyValue;
						if (activeStepIndex === 2) return targetAmount === initialTargetAmount;
					})()}
				>
					{activeStepIndex === 2 ? APP_TEXT.create : APP_TEXT.continue}
				</Button>
			</Box>

			<Drawer
				content={
					<div className='flex flex-col items-center pb-4'>
						<div className='mb-4 h-10 w-10 pb-4 text-primary-violet'>{APP_ICON.check}</div>
						<div className='text-center font-semibold'>
							{APP_TEXT.goal} <span className='text-primary-violet'>{name}</span> {APP_TEXT.createdSuccess}
						</div>
					</div>
				}
				afterAutoCloseAction={() => navigate(APP_PATH.goalDetails)}
				isCloseDisabled
			/>
		</>
	);
}
