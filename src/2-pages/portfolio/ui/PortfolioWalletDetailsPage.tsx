import {type ButtonConfig, DeleteItem, Details, Icon, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {useState} from 'react';

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

	return (
		<>
			<PageHeader title={walletName} buttonConfigs={buttonConfigs} image={<Icon type='wallet' withBackground />} />

			<div className='flex flex-col gap-6 px-4 pb-6'>
				<Details detailsFields={detailsFields} isLoading={isLoading} />
				<DeleteItem
					confirmationTitle={walletName}
					entityName={APP_TEXT.wallet}
					isPending={isPending}
					isSuccess={isSuccess}
					isError={isError}
					handleDelete={handleDelete}
					successStatusTextKey='deleteWalletSuccess'
					errorStatusTextKey='deleteWalletError'
				>
					{APP_TEXT.deleteWallet}
				</DeleteItem>
			</div>
		</>
	);
}
