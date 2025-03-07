import {PageWidgetsWrapper} from '@pages/ui';
import {PortfolioWalletList} from '@widgets/portfolio';
import {PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

export function PortfolioWalletListPage() {
	return (
		<>
			<PageHeader title={APP_TEXT.connectedWallets} backPath={APP_PATH.portfolio.list} />
			<PageWidgetsWrapper>
				<PortfolioWalletList />
			</PageWidgetsWrapper>
		</>
	);
}
