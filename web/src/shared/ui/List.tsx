import {Fragment, ReactElement, ReactNode} from 'react';

// full path import to prevent cycle imports
import {Box} from '@shared/ui/Box.tsx';
import {Item} from '@shared/ui/Item.tsx';

import {cn, textHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

type Props<R> = {
	title?: ReactNode;
	titleButton?: ReactNode;
	rows: readonly R[];
	renderRow: (row: R) => ReactElement;
};

export function List<R>(props: Props<R>) {
	const {titleButton, title, rows, renderRow} = props;

	return (
		<>
			{(title || titleButton) && (
				<div
					role='card-title'
					className={cn(
						'flex py-6 pb-3',
						title && titleButton && 'justify-between',
						!title && titleButton && 'justify-end',
					)}
				>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton}
				</div>
			)}

			<Box className='p-1' isCard>
				{rows.map((row, index) => (
					<Fragment key={index}>{renderRow(row)}</Fragment>
				))}

				{!rows.length && <Item name={textHelpers.getDontHaveAny(APP_TEXT.goal)} isNameText />}
			</Box>
		</>
	);
}
