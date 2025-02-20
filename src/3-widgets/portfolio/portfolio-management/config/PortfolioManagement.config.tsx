import {APP_TEXT} from '@shared/constants';
import {type ButtonConfig, Icon} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.connectWallet,
		type: 'secondary',
		icon: <Icon type='plus' />,
		onClick: () => alert('Navigate to connect wallet page'),
	},
] as ButtonConfig[];
