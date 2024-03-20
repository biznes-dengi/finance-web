import {Box, Button, BUTTON_TYPE, ButtonConfig} from '@shared/ui';

import {cn, textHelpers} from '@shared/lib';
import {CURRENCY} from '@entities/goal';

type Props = {
	item: {
		amount: number;
		currency: CURRENCY;
	};
	buttonConfigs: ButtonConfig[];
	subtitle?: string;
};

export function Management(props: Props) {
	const {item, buttonConfigs, subtitle} = props;

	return (
		<div role='management' className='p-4'>
			<div className={cn('mb-4 flex justify-between')}>
				<div>
					<Box type='title' isMainTitle>
						{textHelpers.getAmountWithCurrency(textHelpers.getAmount(item.amount), item.currency)}
					</Box>
					{subtitle && <Box type='subtitle'>{subtitle}</Box>}
				</div>
				<div className='h-10 w-10 rounded-xl bg-secondary-grey' />
			</div>

			<div className='flex justify-between'>
				{buttonConfigs.map((buttonConfig) => (
					<Button
						key={buttonConfig.name}
						type={BUTTON_TYPE.circle}
						icon={buttonConfig.icon}
						onClick={buttonConfig.onClick}
					>
						{buttonConfig.name}
					</Button>
				))}
			</div>
		</div>
	);
}
