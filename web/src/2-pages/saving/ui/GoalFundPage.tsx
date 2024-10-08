import {useState} from 'react';
import {Button, ButtonType, CurrencyField} from '@shared/ui';
import {CURRENCY_MAP} from '@shared/constants';
import {savingModel} from '@entities/saving';

export function GoalFundPage() {
	const filter = {pageNumber: 0};
	const {
		data: {data},
	} = savingModel.useItems(filter);

	const [value, setValue] = useState<number | undefined>();

	function handleFundClick() {
		console.log(`funded ${value}`);
		console.log('success UX');
		console.log('redirect');
	}

	const firstItemBalance = 1100;
	// const exchangeRate = 3.9071;

	return (
		<>
			<div className='mb-6'>Fund</div>

			<div className='flex-1'>
				<CurrencyField
					options={data?.map((saving) => ({
						name: saving.name,
						currencySymbol: CURRENCY_MAP[saving.currency].symbol,
						mask: undefined,
					}))}
					value={value}
					onChange={setValue}
					leftLabel={{balance: firstItemBalance}}
				/>
			</div>

			<Button type={ButtonType.main} onClick={handleFundClick}>
				Fund
			</Button>
		</>
	);
}
