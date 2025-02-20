import {ReactNode, useEffect, useState} from 'react';
import {cn} from '@shared/lib';
import {Button, Icon, Popup, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

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
			<div className='flex w-full items-center justify-between px-4 text-sm '>
				<div className='font-medium text-primary-grey'>{APP_TEXT.exchangeRate}</div>
				<div className='shrink-0'>
					<Button icon={<Icon type='trendUp' />} onClick={openPopup}>
						{buttonText}
					</Button>
				</div>
			</div>

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
					<Button onClick={handleSaveClick} type='primary'>
						Change currency rate
					</Button>
				</div>
			</Popup>
		</>
	);
}
