import {Icon, PageHeader, Popup, usePopupState} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

export function PortfolioConnectWalletPage() {
	const {popupProps, openPopup} = usePopupState();

	return (
		<>
			<PageHeader title={APP_TEXT.connectWallet} />
			<div className='flex-1 px-4'>
				<div className='h-10 w-32'>Form</div>
				<div className='h-10 w-32'>supported networks: SOL</div>
				<div className='flex cursor-pointer items-center gap-2 text-sm text-primary-grey' onClick={openPopup}>
					<div>How it works</div>
					<div>
						<Icon type='info' />
					</div>
				</div>
			</div>
			<div className='mb-6 px-4 text-sm text-primary-grey'>
				Finansy do not have access to your wallet, to your private keys nor to the ability to move your assets. We are
				requesting only <span className='font-medium'>view permissions</span>.
			</div>

			<Popup {...popupProps}>
				<div className='flex flex-col gap-4 px-4'>
					<div className=''>
						Вы подключаете свои кошельки и получаете{' '}
						<span className='font-medium text-primary-violet'>список всех своих активов в одном месте</span>.
					</div>

					<div className='font-medium'>Важно</div>

					<div>Точка входа в актив считается в момент поступления на кошелек.</div>

					<div className='font-medium'>Пример</div>

					<div>
						5 января 2023 Вы купили BTC на бирже Binance за 20 000$. 5 янв 2024, когда он стоил 100 000$ Вы перевели его
						на кошелек trust wallet и подключили через finansy.io. Ваша цена покупки будет 100 000$.
					</div>
				</div>
			</Popup>
		</>
	);
}
