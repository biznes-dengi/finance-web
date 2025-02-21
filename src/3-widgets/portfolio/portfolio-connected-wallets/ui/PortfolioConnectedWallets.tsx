import {Icon, Item, List, TextField} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

export function PortfolioConnectedWallets() {
	const wallets = [
		{name: 'Phantom мемасы', description: '0x812731...12L1bb2sk'},
		{name: 'Metamask долгосрок ETH', description: '0x8193921...2348H6lsk'},
		{name: 'Краткосрок флиппинг', description: '0x7613921...2Lq8H6lsk'},
	];

	return (
		<div className='flex flex-col gap-6'>
			<TextField value={''} onChange={() => {}} placeholder={APP_TEXT.search} isSearch />
			<List items={wallets} renderItem={(wallet) => <Item {...wallet} icon={<Icon type='calendar' />} />} />
		</div>
	);
}
