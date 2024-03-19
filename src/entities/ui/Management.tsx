import {Box, Button, BUTTON_TYPE} from '@shared/ui';

import {cn, textHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';
import {CURRENCY} from '@entities/goal';
import {ButtonConfig} from '@shared/types';

type Props = {
	item: {
		amount: number;
		currency: CURRENCY;
	};
	buttonConfigs: ButtonConfig[];
};

export function Management(props: Props) {
	const {item, buttonConfigs} = props;

	return (
		<div role='management' className='p-4'>
			<div className={cn('mb-4 flex justify-between')}>
				<div>
					<Box type='title' isMainTitle>
						{textHelpers.getAmountWithCurrency(textHelpers.getAmount(item.amount), item.currency)}
					</Box>
					<Box type='subtitle'>{APP_TEXT.accumulated}</Box>
				</div>
				<div className='h-10 w-10 rounded-xl bg-secondary-grey' />
			</div>

			<div className='flex justify-between'>
				{buttonConfigs.map((buttonConfig) => (
					<Button key={buttonConfig.name} type={BUTTON_TYPE.circle} icon={buttonConfig.icon}>
						{buttonConfig.name}
					</Button>
				))}
			</div>
		</div>
	);
}
