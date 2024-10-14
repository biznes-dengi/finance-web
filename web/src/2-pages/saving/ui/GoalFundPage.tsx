import {useState} from 'react';
import {Box, Button, ButtonType, Icon, NumericInputWithOptions, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {savingModel} from '@entities/saving';

export function GoalFundPage() {
	const [value, setValue] = useState<number | undefined>();

	const filter = {pageNumber: 0};
	// TODO: тип items должен быть ItemsData | undefined
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
				<NumericInputWithOptions value={value} onChange={setValue} options={items} />
				<Box baseMarginY>
					<Button onClick={() => {}} icon={Icon.calendar}>
						{currentDate}
					</Button>
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
