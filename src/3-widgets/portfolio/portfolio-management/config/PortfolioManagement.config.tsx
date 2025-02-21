import {APP_PATH, APP_TEXT, CURRENCY, CURRENCY_CODE} from '@shared/constants';
import {type ButtonConfig, Icon} from '@shared/ui';
import {ManagementSettingsConfigs} from '@shared/ui/management/type/Management.types.ts';

export const buttonConfigs = [
	{
		name: APP_TEXT.connectWallet,
		type: 'secondary',
		icon: <Icon type='plus' />,
		onClick: () => alert('Navigate to connect wallet page'),
	},
	{
		type: 'secondary',
		icon: <Icon type='share' />,
		onClick: () => alert('share in tg for viral effect'),
	},
] as ButtonConfig[];

export const settingsConfigs = [
	[
		{
			name: APP_TEXT.connectedWallets,
			icon: <Icon type='wallet' />,
			onClick: ({navigate}) => navigate(APP_PATH.portfolio.connectedWallets),
		},
		{
			name: APP_TEXT.currency,
			description: 'Coming soon',
			icon: <Icon type='dollar' />,
			rightNode: <div className='text-primary-grey'>{CURRENCY_CODE[CURRENCY.USD]}</div>,
		},

		{
			name: APP_TEXT.howItWorks,
			icon: <Icon type='info' className='size-4' />,
			onClick: ({navigate}) => navigate(APP_PATH.portfolio.info),
		},
	],
] as ManagementSettingsConfigs;
