import {PortfolioConnectedWallets} from '@widgets/portfolio';
import {PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function PortfolioConnectedWalletsPage() {
	return (
		<>
			<PageHeader title={APP_TEXT.connectedWallets} backPath={APP_PATH.portfolio.list} />
			<div className='px-4 pb-6'>
				<PortfolioConnectedWallets />
			</div>
		</>
	);
}
