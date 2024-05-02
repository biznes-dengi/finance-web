import {useState} from 'react';
import {APP_ICON, CurrencyField} from '@shared/ui';
import {APP_TEXT} from '@shared/config';

type Value = number | undefined;

export function Transfer() {
	const [firstItemValue, setFirstItemValue] = useState<Value>();
	const [secondItemValue, setSecondItemValue] = useState<Value>();

	const firstItemBalance = 1100;
	const secondItemBalance = 100;

	const exchangeRate = 3.9071;
	const currentDate = '1 May 2024, 16:34';

	function handleValueChange(value: Value) {
		if (!value) return;

		setFirstItemValue(value);
		setSecondItemValue(Number((value * exchangeRate).toFixed(2)));
	}

	return (
		<div role='transfer'>
			<div className='pb-3 text-2xl font-semibold'>{APP_TEXT.transfer}</div>

			<div className='flex flex-col gap-1.5 pb-6 text-sm'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-1 text-primary-violet'>
						<div className='h-4 w-4'>{APP_ICON.calendar}</div>
						<div>{currentDate}</div>
					</div>
					<div className='flex items-center gap-1.5 text-primary-violet'>
						<div>Edit</div>
						<div className='h-3 w-3'>{APP_ICON.edit}</div>
					</div>
				</div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-1 text-primary-violet'>
						<div className='h-4 w-4'>{APP_ICON.trendUp}</div>
						<div>1 $ = {exchangeRate} zł</div>
					</div>
					<div className='rounded-2xl bg-primary-violet px-2 text-white'>Custom</div>
				</div>
			</div>

			<div className='relative'>
				<CurrencyField
					option={{currencyCode: 'Mustang', currencySymbol: '$'}}
					value={firstItemValue}
					onChange={handleValueChange}
					leftLabel={{balance: firstItemBalance}}
				/>

				<div className='absolute left-[150px] top-[74px] flex h-8 w-8 items-center justify-center rounded-full bg-white'>
					<div className='h-4 w-4 text-primary-violet'>{APP_ICON.transferTo}</div>
				</div>

				<CurrencyField
					className='mt-2'
					value={secondItemValue}
					onChange={handleValueChange}
					option={{currencyCode: 'House', currencySymbol: 'zł'}}
					leftLabel={{balance: secondItemBalance}}
				/>
			</div>
		</div>
	);
}
