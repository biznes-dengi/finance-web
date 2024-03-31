import {useState} from 'react';

import {PageHeader, Select, Stepper} from '@entities/ui';

import {APP_ICON, Box, Button, BUTTON_TYPE, NumericField, TextField} from '@shared/ui';
import {APP_TEXT, boxShadow, CURRENCY} from '@shared/constants';
import {cn} from '@shared/lib';

const initialStepIndex = 0;

const hints = ['hint 1', 'hint 2', 'hint 3', 'hint 4', 'hint 5', 'hint 6', 'hint 7', 'hint 8'];

const currencyOptions = [
	{description: 'PLN', name: 'Polish Zloty', value: CURRENCY.PLN},
	{description: 'USD', name: 'US Dollar', value: CURRENCY.USD},
	{description: 'BYN', name: 'BLR rubel', value: CURRENCY.BYN},
];

const initialName = '';
const initialCurrencyValue = null;
const initialTargetAmount = '';

export function GoalCreatePage() {
	/** Form state */
	const [name, setName] = useState(initialName);
	const [currencyValue, setCurrencyValue] = useState<CURRENCY | null>(initialCurrencyValue);
	const [targetAmount, setTargetAmount] = useState(initialTargetAmount);

	const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex);

	const selectedCurrencyOption = currencyOptions.find((option) => option.value === currencyValue);

	return (
		<>
			<PageHeader
				handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			/>

			<div role='image-wrapper' className='relative h-[293px] bg-secondary-grey'>
				{activeStepIndex === initialStepIndex && (
					<div
						className={cn(
							'absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white',
							boxShadow,
						)}
						onClick={() => alert('Upload a photo')}
					>
						{APP_ICON.camera}
					</div>
				)}
			</div>

			<div className={cn('flex h-2/3 flex-col')}>
				<div className={cn('flex-1')}>
					<Stepper
						activeStepIndex={activeStepIndex}
						steps={[
							<>
								<Box withBaseHorizontal>
									<TextField value={name} onChange={setName} maxLength={25} placeholder='Goal name' />
								</Box>
								{!name && (
									<Box withBaseHorizontal className={cn('flex flex-wrap')}>
										{hints.map((hint, index) => (
											<div
												key={hint + index}
												className={cn('mb-2 mr-1 w-fit rounded-2xl bg-secondary-grey px-2 py-0.5')}
												onClick={() => setName(hint)}
											>
												{hint}
											</div>
										))}
									</Box>
								)}
							</>,
							<>
								<Box withBaseHorizontal withBaseBottom>
									<span className='text-xl font-semibold'>{APP_TEXT.chooseCurrency}</span>
								</Box>
								<Box withBaseHorizontal>
									<Select options={currencyOptions} onChange={setCurrencyValue} value={currencyValue} />
								</Box>
							</>,
							<>
								<Box withBaseHorizontal>
									<NumericField
										value={targetAmount}
										onChange={setTargetAmount}
										currencySymbol={selectedCurrencyOption?.description}
									/>
								</Box>
							</>,
						]}
					/>
				</div>

				<Box withBaseHorizontal withMediumVertical>
					<Button
						onClick={() => setActiveStepIndex(activeStepIndex + 1)}
						type={BUTTON_TYPE.primary}
						disabled={(() => {
							if (activeStepIndex === 0) return name === initialName;
							if (activeStepIndex === 1) return currencyValue === initialCurrencyValue;
							if (activeStepIndex === 2) return targetAmount === initialTargetAmount;
						})()}
					>
						{APP_TEXT.continue}
					</Button>
				</Box>
			</div>
		</>
	);
}
