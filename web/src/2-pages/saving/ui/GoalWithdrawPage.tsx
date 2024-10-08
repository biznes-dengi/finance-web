import {CURRENCY_MAP} from '@shared/constants';
import {Box, Button, ButtonType, CurrencyField} from '@shared/ui';
import {savingModel} from '@entities/saving';
import {useState} from 'react';

type Value = number | undefined;

export function GoalWithdrawPage() {
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

	function handleWithdrawClick() {
		alert('funded');
		alert('success UX');
	}

	return (
		<Box basePadding>
			<div>GoalWithdrawPage</div>
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
			<Button type={ButtonType.main} onClick={handleWithdrawClick}>
				Withdraw
			</Button>
		</Box>
	);
}
