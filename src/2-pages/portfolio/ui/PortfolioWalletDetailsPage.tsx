import {useState} from 'react';
import {PageWidgetsWrapper} from '@pages/ui';
import {type ButtonConfig, DeleteItem, deleteItemConfirmation, Details, Icon, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';

// move into WalletDetailsWidget
export const buttonConfigs = [
	{
		name: APP_TEXT.edit,
		type: 'secondary',
		icon: <Icon type='edit' />,
		onClick: ({navigate}) => navigate(APP_PATH.portfolio.getItemWalletEditPath('1')),
	},
] as ButtonConfig[];
const detailsFields = [
	{
		label: 'Address',
		node: (
			<div className='flex items-center gap-1.5' onClick={() => alert('Copied')}>
				<div>0x8193921...2348H6lsk</div>
				<div>
					<Icon type='copy' />
				</div>
			</div>
		),
	},
];

export function PortfolioWalletDetailsPage() {
	const isLoading = false;

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	function handleDelete() {
		setIsSuccess(true);
	}

	const isPending = false;
	const isError = false;
	const walletName = 'Metamask memes';
	const portfolioName = 'Portfolio 1';

	return (
		<>
			<PageHeader
				title={walletName}
				buttonConfigs={buttonConfigs}
				backPath={APP_PATH.portfolio.wallets}
				image={<Icon type='wallet' withBackground />}
			/>
			<PageWidgetsWrapper>
				<Details detailsFields={detailsFields} isLoading={isLoading} />
				<DeleteItem
					confirmationTitle={walletName}
					confirmationText={deleteItemConfirmation.disconnectWallet(portfolioName)}
					isPending={isPending}
					isSuccess={isSuccess}
					isError={isError}
					actionButtonText={APP_TEXT.disconnect}
					handleDelete={handleDelete}
					successStatusTextKey='disconnectWalletSuccess'
					errorStatusTextKey='disconnectWalletError'
				>
					{`${APP_TEXT.disconnect} ${APP_TEXT.wallet.toLowerCase()}`}
				</DeleteItem>
			</PageWidgetsWrapper>
		</>
	);
}
