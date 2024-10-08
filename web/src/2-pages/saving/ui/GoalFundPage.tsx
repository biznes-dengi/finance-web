import {useState} from 'react';
import {Button, ButtonType, CurrencyField} from '@shared/ui';
import {CURRENCY_MAP} from '@shared/constants';
import {savingModel} from '@entities/saving';

type Value = number | undefined;

export function GoalFundPage() {
	const filter = {pageNumber: 0};
	const {
		data: {data},
	} = savingModel.useItems(filter);

	const [firstItemValue, setFirstItemValue] = useState<Value>();

	const firstItemBalance = 1100;

	// const exchangeRate = 3.9071;

	function handleValueChange(value: Value) {
		if (!value) return;

		setFirstItemValue(value);
	}

	function handleFundClick() {
		alert('funded');
		alert('success UX');
	}

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
					value={firstItemValue}
					onChange={handleValueChange}
					leftLabel={{balance: firstItemBalance}}
				/>
			</div>

			<Button type={ButtonType.main} onClick={handleFundClick}>
				Fund
			</Button>
		</>
	);
}
