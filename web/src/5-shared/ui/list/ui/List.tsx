import {Fragment} from 'react';
import {Box, Item, ItemSkeleton} from '@shared/ui';
import {cn, textHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';
import {Props} from '../types/List.types.ts';

export function List<R>(props: Props<R>) {
	const {titleButton, title, rows, renderRow, isFetching} = props;

	return (
		<>
			{(title || titleButton) && (
				<div className={cn('flex py-6 pb-3', title && titleButton && 'justify-between')}>
					{title && <div className='font-semibold'>{title}</div>}
					{titleButton}
				</div>
			)}

			{!isFetching && (
				<Box isCard>
					{rows?.length && rows.map((row, index) => <Fragment key={index}>{renderRow(row)}</Fragment>)}
					{!rows?.length && <Item name={textHelpers.getDontHaveAny(APP_TEXT.goal)} isNameText />}
				</Box>
			)}

			{isFetching && Array.from({length: 3}).map(() => <ItemSkeleton key={Math.random()} />)}
		</>
	);
}
