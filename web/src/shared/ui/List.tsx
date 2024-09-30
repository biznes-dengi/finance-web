import {Fragment, ReactElement, ReactNode} from 'react';

import {Box, Item} from '@shared/ui';

import {cn, styleElement, textHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';

type Props<R> = {
	title?: ReactNode;
	titleButton?: ReactNode;
	rows: readonly R[];
	renderRow: (row: R) => ReactElement;
	isLoading?: boolean;
};

export function List<R>(props: Props<R>) {
	const {titleButton, title, rows, renderRow, isLoading} = props;

	return (
		<>
			{(title || titleButton) && (
				<div className={cn('flex py-6 pb-3', title && titleButton && 'justify-between')}>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton}
				</div>
			)}

			<Box className='p-1' isCard>
				{rows?.length ? (
					rows.map((row, index) => (
						<Fragment key={index}>{styleElement(renderRow(row), 'mb-1 last:mb-0 p-3 shadow-none')}</Fragment>
					))
				) : (
					<Item name={textHelpers.getDontHaveAny(APP_TEXT.goal)} className='p-3 shadow-none' isNameText />
				)}
			</Box>

			{isLoading && <div>isLoading...</div>}
		</>
	);
}
