import {CURRENCY_MAP} from '@shared/constants';
import {Box, Button, ButtonType, CurrencyField} from '@shared/ui';
import {savingModel} from '@entities/saving';
import {useState} from 'react';

export function GoalWithdrawPage() {
	const filter = {pageNumber: 0};
	const {
		data: {data},
	} = savingModel.useItems(filter);

	const [value, setValue] = useState<number | undefined>();

	function handleFundClick() {
		console.log(`Withdrew ${value}`);
		console.log('success UX');
		console.log('redirect');
	}

	const firstItemBalance = 1100;
	// const exchangeRate = 3.9071;

	return (
		<Box basePadding>
			<div>GoalWithdrawPage</div>
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
			<Button type={ButtonType.main} onClick={handleFundClick}>
				Withdraw
			</Button>
		</Box>
	);
}
