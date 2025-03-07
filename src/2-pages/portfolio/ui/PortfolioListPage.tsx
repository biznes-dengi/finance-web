import {PageWidgetsWrapper} from '@pages/ui';
import {PortfolioManagement, PortfolioWallets} from '@widgets/portfolio';

export function PortfolioListPage() {
	return (
		<PageWidgetsWrapper>
			<PortfolioManagement />
			<PortfolioWallets />
		</PageWidgetsWrapper>
	);
}
