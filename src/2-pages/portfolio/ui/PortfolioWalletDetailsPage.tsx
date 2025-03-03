import {type ButtonConfig, Card, Icon, LoadingWrapper, PageHeader} from '@shared/ui';
import {APP_PATH, APP_TEXT} from '@shared/constants';
import {ReactNode} from 'react';

export const buttonConfigs = [
	{
		name: APP_TEXT.edit,
		type: 'secondary',
		icon: <Icon type='edit' />,
		onClick: ({navigate}) => navigate(APP_PATH.portfolio.connectWallet),
	},
	{
		name: APP_TEXT.delete,
		type: 'secondary',
		icon: <Icon type='delete' />,
		className: 'bg-red-100 text-red-600',
		onClick: ({navigate}) => navigate(APP_PATH.portfolio.connectWallet),
	},
] as ButtonConfig[];

export function PortfolioWalletDetailsPage() {
	const detailsFields = [
		{label: 'Name', node: 'Metamask memes'},
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

	const isLoading = false;

	return (
		<>
			<PageHeader
				title={APP_TEXT.walletDetails}
				image={<Icon type='wallet' withBackground />}
				buttonConfigs={buttonConfigs}
			/>

			<div className='flex flex-col gap-6 px-4 pb-6'>
				<Details detailsFields={detailsFields} isLoading={isLoading} />
			</div>
		</>
	);
}

export function Details({
	detailsFields,
	isLoading,
}: {
	detailsFields: {label: string; node: ReactNode}[];
	isLoading: boolean;
}) {
	return (
		<Card>
			{detailsFields.map(({label, node}, index) => (
				<div className='flex justify-between p-4 text-sm' key={index}>
					<LoadingWrapper isLoading={isLoading} className='mb-1 h-4 w-10'>
						<div className='font-medium text-primary-grey'>{label}</div>
					</LoadingWrapper>
					<LoadingWrapper isLoading={isLoading} className='mb-1 h-4 w-10'>
						<div>{node}</div>
					</LoadingWrapper>
				</div>
			))}
		</Card>
	);
}
