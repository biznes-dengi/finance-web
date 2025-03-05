import {APP_PATH, APP_TEXT} from '@shared/constants';
import {type ButtonConfig, Icon} from '@shared/ui';

export const buttonConfigs = [
	{
		name: APP_TEXT.connectWallet,
		type: 'secondary',
		icon: <Icon type='plus' />,
		onClick: ({navigate}) => navigate(APP_PATH.portfolio.connectWallet),
	},
] as ButtonConfig[];
