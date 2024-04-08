import {useState} from 'react';

import {PageHeader, Select, Stepper} from '@entities/ui';

import {APP_ICON, Box, Button, BUTTON_TYPE, NumericField, TextField} from '@shared/ui';
import {APP_TEXT} from '@shared/config';
import {CURRENCY} from '@shared/constants';
import {cn} from '@shared/lib';

const hints = ['Mustang', 'House', 'Guitar', 'Maldives', 'TV', 'iPhone 17', 'Book'];

const currencyOptions = [
	{description: 'PLN', symbol: 'zł', name: 'Polish Zloty', value: CURRENCY.PLN},
	{description: 'USD', symbol: '$', name: 'US Dollar', value: CURRENCY.USD},
	{description: 'BYN', symbol: 'byn', name: 'BLR rubel', value: CURRENCY.BYN},
	{description: 'EUR', symbol: 'eur', name: 'Euro', value: CURRENCY.EUR},
	{description: 'GBP', symbol: 'gbp', name: 'British pound', value: CURRENCY.GBP},
	{description: 'GBP', symbol: 'gbp', name: 'British pound', value: CURRENCY.GBP},
];

const initialStepIndex = 0;
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

	function handleCurrencyValueChange(value: CURRENCY) {
		setCurrencyValue(value);
		setTargetAmount(initialTargetAmount);
	}

	return (
		<>
			<div role='image-wrapper' className='flex h-[290px] flex-col items-end justify-between bg-secondary-grey'>
				<PageHeader
					handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
				/>

				{activeStepIndex === initialStepIndex && (
					<div
						className='z-10 mb-4 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-blue text-white shadow-[0_0_0_4px_white_inset]'
						onClick={() => alert('Upload a photo')}
					>
						{APP_ICON.camera}
					</div>
				)}
			</div>

			<div className={cn('flex h-[calc(100%-290px)] flex-col')}>
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
												className={cn('mb-2 mr-1 w-fit rounded-2xl bg-secondary-grey px-2 py-0.5 text-sm')}
												onClick={() => setName(hint)}
											>
												{hint}
											</div>
										))}
									</Box>
								)}
							</>,
							<>
								<Box withBaseHorizontal>
									<Select options={currencyOptions} onChange={handleCurrencyValueChange} value={currencyValue} />
								</Box>
							</>,
							<>
								<Box withBaseHorizontal>
									<NumericField
										value={targetAmount}
										onChange={setTargetAmount}
										currencyCode={selectedCurrencyOption?.description}
										currencySymbol={selectedCurrencyOption?.symbol}
									/>
								</Box>
							</>,
						]}
					/>
				</div>

				<Box withBaseHorizontal withMediumVertical>
					<Button
						onClick={
							activeStepIndex === 2
								? () => alert('Goal successfully created')
								: () => setActiveStepIndex(activeStepIndex + 1)
						}
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
			</div>
		</>
	);
}
