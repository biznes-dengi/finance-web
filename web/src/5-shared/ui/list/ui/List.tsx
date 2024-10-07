import {Fragment} from 'react';
import {Box, Item, ItemSkeleton} from '@shared/ui';
import {textHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';
import {Props} from '../types/List.types.ts';

export function List<R>(props: Props<R>) {
	const {rows, renderRow, isFetching} = props;

	return (
		<>
			{!isFetching && (
				<Box isCard>
					{rows?.length && rows.map((row, index) => <Fragment key={index}>{renderRow(row)}</Fragment>)}
					{!rows?.length && <Item name={textHelpers.getDontHaveAny(APP_TEXT.goal)} isNameText />}
				</Box>
			)}

			{isFetching && <ItemSkeleton />}
		</>
	);
}
