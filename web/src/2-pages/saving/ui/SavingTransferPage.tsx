import {useState} from 'react';

import {Icon, CurrencyField, Box, ButtonType, Button, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {savingModel} from '@entities/saving';

type Value = number | undefined;

export function SavingTransferPage() {
	const filter = {pageNumber: 0};
	const {
		data: {data},
	} = savingModel.useItems(filter);

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

	function handleTransferClick() {
		console.log(`firstItemValue отполнить на ${firstItemValue}`);
		console.log(`secondItemValue пополнить на ${secondItemValue}`);
	}

	return (
		<>
			<div className='mb-2'>
				<PageHeader title={APP_TEXT.transfer} backPath={APP_PATH.root} />
			</div>

			<Box basePadding>
				{/*<div className='bg-amber-200'>*/}
				{/*	<div>Calendar fields</div>*/}
				{/*	<div onClick={handleSlideRight} className='mt-4 font-semibold'>*/}
				{/*		Back*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div className='pb-6 text-2xl font-semibold'>{APP_TEXT.transfer}</div>*/}

				<div className='relative'>
					<CurrencyField
						options={data?.map((saving) => ({
							name: saving.name,
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

				<Box mediumMarginY className='flex flex-col gap-2 text-sm'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-1 text-primary-violet'>
							<div className='h-4 w-4'>{Icon.calendar}</div>
							<div>{currentDate}</div>
						</div>
						<div
							className='flex items-center gap-1.5 text-primary-violet'
							onClick={() => alert('calendar fields appear with animation')}
						>
							<div className='h-3 w-3'>{Icon.edit}</div>
							<div>Edit</div>
						</div>
					</div>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-1 text-primary-violet'>
							<div className='h-4 w-4'>{Icon.trendUp}</div>
							<div>1 $ = {exchangeRate} zł</div>
						</div>
						<div
							className='flex items-center gap-1.5 text-primary-violet'
							onClick={() => alert('exchangeRate appear with animation')}
						>
							<div className='h-3 w-3'>{Icon.edit}</div>
							<div>Edit</div>
						</div>
					</div>
				</Box>

				<Button type={ButtonType.main} onClick={handleTransferClick}>
					Transfer
				</Button>

				{/*<div className='bg-green-200'>*/}
				{/*	<div>Exchange currency fields</div>*/}
				{/*	<div onClick={handleSlideLeft} className='mt-4 font-semibold'>*/}
				{/*		Back*/}
				{/*	</div>*/}
				{/*</div>*/}
			</Box>
		</>
	);
}
