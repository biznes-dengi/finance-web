import {PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function PortfolioInfoPage() {
	return (
		<>
			<PageHeader
				title={APP_TEXT.howItWorks}
				backPath={APP_PATH.portfolio.list}
				subDescription={'Note: мы не имеем доступа к вашему кошельку, мы только считываем оттуда информацию.'}
			/>
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
		</>
	);
}
