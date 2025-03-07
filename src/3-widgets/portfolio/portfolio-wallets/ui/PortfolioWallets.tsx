import {APP_PATH, APP_TEXT} from '@shared/constants';
import {Card, Icon, Item, LinkTitleInCard, List} from '@shared/ui';
import {useNavigate} from 'react-router-dom';
import {GoalModel} from '@entities/goal';

const wallets = [
	{name: 'Phantom мемасы', description: '0x812731...12L1bb2sk'},
	{name: 'Metamask долгосрок ETH', description: '0x8193921...2348H6lsk'},
	{name: 'Краткосрок флиппинг', description: '0x7613921...2Lq8H6lsk'},
];

export function PortfolioWallets() {
	const navigate = useNavigate();

	const {isGoalsLoading} = GoalModel.useItems();

	const isLoading = isGoalsLoading;

	return (
		<Card
			titleInCard={
				!isLoading && !wallets?.length ? null : (
					<LinkTitleInCard title={APP_TEXT.connectedWallets} path={APP_PATH.portfolio.wallets} />
				)
			}
			isLoading={isLoading}
		>
			<List
				emptyTextKey='wallets'
				isLoading={isLoading}
				items={wallets ? [wallets[0], wallets[1], wallets[2]] : []}
				renderItem={(wallet, index) => (
					<Item
						key={index}
						image={<Icon type='wallet' withBackground />}
						name={wallet.name}
						description={wallet.description}
						onClick={() => navigate(APP_PATH.portfolio.getItemWalletDetailsPath('1'))}
					/>
				)}
			/>
		</Card>
	);
}
