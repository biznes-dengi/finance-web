import {ReactNode, useEffect, useState} from 'react';
import {cn} from '@shared/lib';
import {Box, Button, ButtonType, Dialog, Icon, useDialogState} from '@shared/ui';

type Props = {
	buttonText: ReactNode;
	value: number | undefined;
	onChange: (value: number | undefined) => void;
};

export function CurrencyPicker(props: Props) {
	const {value, onChange, buttonText} = props;

	const {dialogRef, openDialog, closeDialog} = useDialogState();

	const [currencyRate, setCurrencyRate] = useState<number | undefined>();

	useEffect(() => {
		setCurrencyRate(value ? Number(value) : undefined);
	}, [value]);

	return (
		<>
			<Box>
				<Button icon={Icon.trendUp} onClick={() => openDialog()}>
					{buttonText}
				</Button>
			</Box>

			<Dialog ref={dialogRef}>
				<div className='flex w-full flex-col gap-4'>
					<div className='flex items-center'>
						<div className='mr-2 shrink-0 font-medium'>1 $ =</div>
						<label className='w-full rounded-2xl bg-secondary-grey p-4'>
							<input
								className={cn('w-full bg-inherit caret-primary-violet outline-0')}
								value={currencyRate}
								onChange={(event) => setCurrencyRate(event.target.value ? Number(event.target.value) : undefined)}
								placeholder={'Currency rate'}
								type='number'
							/>
						</label>
					</div>
					<Button
						onClick={() => {
							onChange(currencyRate ? Number(currencyRate) : undefined);
							closeDialog();
						}}
						type={ButtonType.main}
					>
						Change currency rate
					</Button>
				</div>
			</Dialog>
		</>
	);
}
