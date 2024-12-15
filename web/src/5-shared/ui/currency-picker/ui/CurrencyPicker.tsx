import {ReactNode, useEffect, useState} from 'react';
import {cn} from '@shared/lib';
import {Box, Button, ButtonType, Popup, Icon, usePopupState} from '@shared/ui';

type Props = {
	buttonText: ReactNode;
	value: number;
	onChange: (value: number) => void;
};

// CurrencyRatePicker, CurrencyPicker когда выбираю какая валюта (USD, RUB)

export function CurrencyPicker(props: Props) {
	const {value, onChange, buttonText} = props;

	const {popupProps, openPopup, closePopup} = usePopupState();

	const [currencyRate, setCurrencyRate] = useState<number>();

	useEffect(() => {
		setCurrencyRate(value);
	}, [value]);

	function handleSaveClick() {
		if (!currencyRate) return;
		onChange(currencyRate);
		closePopup();
	}

	return (
		<>
			<Box>
				<Button icon={<Icon type='trendUp' />} onClick={openPopup}>
					{buttonText}
				</Button>
			</Box>

			<Popup {...popupProps}>
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
					<Button onClick={handleSaveClick} type={ButtonType.main}>
						Change currency rate
					</Button>
				</div>
			</Popup>
		</>
	);
}
