import {useState} from 'react';
import {portfolioNameMaxLength} from '@widgets/portfolio';
import {Button, PageHeader, Spinner, StatusPopup, StatusPopupHelpers, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {cn, useResponsive} from '@shared/lib';
import {useNavigate} from 'react-router-dom';

const hints = ['Phantom memes', 'Metamask memes', 'Long term altcoins', 'Cold wallet', 'Flipping'];

/**
 * Фронтовая логика валидации: 1 get запрос на лист с фильтром name={name}
 * */

export function PortfolioConnectWalletPage() {
	const navigate = useNavigate();

	const [activeStepIndex, setActiveStepIndex] = useState(0);

	const [name, setName] = useState('');
	const [address, setAddress] = useState('');

	const [isConnectWalletSuccess] = useState(false);
	const [isConnectWalletError, setConnectWalletError] = useState(false);

	const {isMobile} = useResponsive();

	const isConnectWalletPending = false;

	const isNameValidationPending = false;
	const isNameValidationSuccess = false;
	const isNameValidationError = false;

	const isAddressValidationPending = false;
	const isAddressValidationSuccess = false;
	const isAddressValidationError = false;

	return (
		<>
			<PageHeader
				title={activeStepIndex === 0 ? APP_TEXT.enterWalletName : APP_TEXT.enterWalletAddress}
				subDescription={activeStepIndex === 1 && APP_TEXT.connectWalletDisclaimer}
				backPath={APP_PATH.portfolio.list}
				stepsCount={2}
				activeStepIndex={activeStepIndex}
				handleBackButtonClick={activeStepIndex === 0 ? undefined : () => setActiveStepIndex(activeStepIndex - 1)}
			/>

			<div className='flex-grow px-4'>
				{activeStepIndex === 0 && (
					<>
						<TextField
							value={name}
							onChange={setName}
							description={
								<>
									{isNameValidationPending && (
										<div className='flex items-center gap-1'>
											<div className='text-primary-grey'>
												<Spinner className='size-3 text-primary-grey' />
											</div>
											<div>Checking name</div>
										</div>
									)}
									{isNameValidationSuccess && <div className='text-primary-violet'>Name is available</div>}
								</>
							}
							errorText={isNameValidationError && 'Such name already exists'}
							maxLength={portfolioNameMaxLength}
							placeholder={APP_TEXT.walletName}
						/>
						{!name && (
							<div className={cn('my-4 flex flex-wrap gap-2')}>
								{hints.map((hint, index) => (
									<Button
										type='secondary'
										key={index}
										className='w-fit px-2.5 py-1.5 text-sm'
										onClick={() => setName(hint)}
									>
										{hint}
									</Button>
								))}
							</div>
						)}
					</>
				)}

				{activeStepIndex === 1 && (
					<TextField
						value={address}
						onChange={setAddress}
						description={
							<>
								{isAddressValidationPending && (
									<div className='flex items-center gap-1'>
										<div className='text-primary-grey'>
											<Spinner className='size-3 text-primary-grey' />
										</div>
										<div>Checking address</div>
									</div>
								)}
								{isAddressValidationSuccess && <div className='text-primary-violet'>Address is available</div>}
							</>
						}
						errorText={isAddressValidationError && 'Such address already connected'}
						placeholder={APP_TEXT.walletAddress}
					/>
				)}
			</div>

			<div className={cn('p-4', !isMobile && 'w-96 self-center')}>
				<Button
					type='primary'
					onClick={
						activeStepIndex === 0
							? () => setActiveStepIndex(activeStepIndex + 1)
							: () => {
									setConnectWalletError(true);
									StatusPopupHelpers.runAfterStatusPopup(() => navigate(APP_PATH.portfolio.list));
							  }
					}
					disabled={
						(activeStepIndex === 0 && (!name || isNameValidationPending || isNameValidationError)) ||
						(activeStepIndex === 1 && (!address || isAddressValidationPending || isAddressValidationError))
					}
					isPending={isConnectWalletPending}
				>
					{activeStepIndex === 0 ? APP_TEXT.continue : APP_TEXT.connect}
				</Button>
			</div>

			<StatusPopup
				isOpen={isConnectWalletSuccess}
				status='success'
				statusTextKey='connectWalletSuccess'
				statusTextProps={{name}}
			/>
			<StatusPopup isOpen={isConnectWalletError} status='error' statusTextKey='connectWalletError' />
		</>
	);
}

// <Popup {...popupProps}>
// 				<div className='flex flex-col gap-4 px-4'>
// 					<div className=''>
// 						Вы подключаете свои кошельки и получаете{' '}
// 						<span className='font-medium text-primary-violet'>список всех своих активов в одном месте</span>.
// 					</div>
//
// 					<div className='font-medium'>Важно</div>
//
// 					<div>Точка входа в актив считается в момент поступления на кошелек.</div>
//
// 					<div className='font-medium'>Пример</div>
//
// 					<div>
// 						5 января 2023 Вы купили BTC на бирже Binance за 20 000$. 5 янв 2024, когда он стоил 100 000$ Вы перевели его
// 						на кошелек trust wallet и подключили через finansy.io. Ваша цена покупки будет 100 000$.
// 					</div>
// 				</div>
// 			</Popup>
