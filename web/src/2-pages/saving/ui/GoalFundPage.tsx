import {useState} from 'react';
import {Box, Button, ButtonType, Icon, NumericInputWithOptions, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT, CURRENCY_MAP} from '@shared/constants';
import {savingModel} from '@entities/saving';
import {textHelpers} from '@shared/lib';

export function GoalFundPage() {
	const [value, setValue] = useState<number | undefined>();

	const filter = {pageNumber: 0};
	// TODO: items: ItemsData | undefined
	const {items} = savingModel.useItems(filter);

	function handleFundClick() {
		console.log(`funded ${value}`);
		console.log('success UX');
		console.log('redirect');
	}

	// TODO:
	if (!items) return null;

	const currentDate = '1 May 2024, 16:34';

	return (
		<>
			<PageHeader title={APP_TEXT.fund} backPath={APP_PATH.root} />

			<Box className='flex-1' basePaddingX>
				<NumericInputWithOptions
					value={value}
					onChange={setValue}
					options={items}
					getLabel={(option) =>
						textHelpers.getBalance(option.balance.amount, CURRENCY_MAP[option.balance.currency].symbol)
					}
				/>
				<Box baseMarginY className='flex flex-col gap-2 text-sm'>
					{/*TODO text-button*/}
					<div className='flex items-center justify-between'>
						<div
							className='flex items-center gap-2 font-medium text-primary-violet'
							onClick={() => alert('calendar fields appear with animation')}
						>
							<div className='h-4 w-4'>{Icon.calendar}</div>
							<div>{currentDate}</div>
						</div>
					</div>
				</Box>
			</Box>

			<Box basePadding>
				<Button type={ButtonType.main} onClick={handleFundClick}>
					{APP_TEXT.fund}
				</Button>
			</Box>
		</>
	);
}
