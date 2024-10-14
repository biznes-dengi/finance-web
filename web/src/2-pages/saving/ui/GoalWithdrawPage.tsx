import {APP_PATH, APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {Box, Button, ButtonType, NumericInputWithOptions, PageHeader} from '@shared/ui';
import {savingModel} from '@entities/saving';
import {useState} from 'react';

export function GoalWithdrawPage() {
	const filter = {pageNumber: 0};
	const {items} = savingModel.useItems(filter);

	const [value, setValue] = useState<number | undefined>();

	function handleFundClick() {
		console.log(`Withdrew ${value}`);
		console.log('success UX');
		console.log('redirect');
	}

	const firstItemBalance = 1100;

	return (
		<>
			<PageHeader title={APP_TEXT.withdraw} backPath={APP_PATH.root} />

			<Box className='flex-1' basePaddingX>
				<NumericInputWithOptions
					options={items?.map((item) => ({
						name: item.name,
						currencySymbol: CURRENCY_MAP[item.balance.currency].symbol,
						mask: undefined,
					}))}
					value={value}
					onChange={setValue}
					leftLabel={{balance: firstItemBalance}}
				/>
			</Box>

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick}>
					{APP_TEXT.withdraw}
				</Button>
			</Box>
		</>
	);
}
