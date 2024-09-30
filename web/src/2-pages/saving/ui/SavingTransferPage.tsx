import {useState} from 'react';

import {Icon, CurrencyField, useSlider} from '@shared/ui';
import {APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {savingModel} from '@entities/saving';

type Value = number | undefined;

export function SavingTransferPage() {
	const [firstItemValue, setFirstItemValue] = useState<Value>();
	const [secondItemValue, setSecondItemValue] = useState<Value>();

	const {handleSlideRight, handleSlideLeft, Slider} = useSlider();

	const firstItemBalance = 1100;
	const secondItemBalance = 100;

	const exchangeRate = 3.9071;
	const currentDate = '1 May 2024, 16:34';

	function handleValueChange(value: Value) {
		if (!value) return;

		setFirstItemValue(value);
		setSecondItemValue(Number((value * exchangeRate).toFixed(2)));
	}

	const {data: savings} = savingModel.useItems();

	return (
		<Slider activeSlideIndex={1}>
			<div className='bg-amber-200'>
				<div>Calendar fields</div>
				<div onClick={handleSlideRight} className='mt-4 font-semibold'>
					Back
				</div>
			</div>

			<div role='transfer'>
				<div className='pb-6 text-2xl font-semibold'>{APP_TEXT.transfer}</div>

				<div className='flex flex-col gap-2 pb-4 text-sm'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-1 text-primary-violet'>
							<div className='h-4 w-4'>{Icon.calendar}</div>
							<div>{currentDate}</div>
						</div>
						<div className='flex items-center gap-1.5 text-primary-violet' onClick={handleSlideLeft}>
							<div className='h-3 w-3'>{Icon.edit}</div>
							<div>Edit</div>
						</div>
					</div>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-1 text-primary-violet'>
							<div className='h-4 w-4'>{Icon.trendUp}</div>
							<div>1 $ = {exchangeRate} zł</div>
						</div>
						<div className='flex items-center gap-1.5 text-primary-violet' onClick={handleSlideRight}>
							<div className='h-3 w-3'>{Icon.edit}</div>
							<div>Edit</div>
						</div>
					</div>
				</div>

				<div className='relative'>
					<CurrencyField
						options={savings.map((saving) => ({
							name: saving.title,
							currencySymbol: CURRENCY_MAP[saving.currency].symbol,
							mask: undefined,
						}))}
						value={firstItemValue}
						onChange={handleValueChange}
						leftLabel={{balance: firstItemBalance}}
					/>

					<div className='absolute left-[150px] top-[74px] flex h-8 w-8 items-center justify-center rounded-full bg-white'>
						<div className='h-4 w-4 text-primary-violet'>{Icon.transferTo}</div>
					</div>

					<CurrencyField
						className='mt-2'
						value={secondItemValue}
						onChange={handleValueChange}
						option={{name: 'House', currencySymbol: 'zł'}}
						leftLabel={{balance: secondItemBalance}}
					/>
				</div>
			</div>

			<div className='bg-green-200'>
				<div>Exchange currency fields</div>
				<div onClick={handleSlideLeft} className='mt-4 font-semibold'>
					Back
				</div>
			</div>
		</Slider>
	);
}
