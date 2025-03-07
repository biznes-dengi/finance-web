import {PageWidgetsWrapper} from '@pages/ui';
import {Icon, Item, List, PageHeader, TextField} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {useNavigate} from 'react-router-dom';

const wallets = [
	{name: 'Phantom мемасы', description: '0x812731...12L1bb2sk'},
	{name: 'Metamask долгосрок ETH', description: '0x8193921...2348H6lsk'},
	{name: 'Краткосрок флиппинг', description: '0x7613921...2Lq8H6lsk'},
];

export function PortfolioWalletListPage() {
	const navigate = useNavigate();

	return (
		<>
			<PageHeader title={APP_TEXT.connectedWallets} backPath={APP_PATH.portfolio.list} />
			<PageWidgetsWrapper>
				<TextField value={''} onChange={() => {}} placeholder={APP_TEXT.search} isSearch />
				<List
					items={wallets}
					renderItem={(wallet) => (
						<Item
							{...wallet}
							image={<Icon type='wallet' withBackground />}
							onClick={() => navigate(APP_PATH.portfolio.getItemWalletDetailsPath('1'))}
						/>
					)}
				/>
			</PageWidgetsWrapper>
		</>
	);
}
