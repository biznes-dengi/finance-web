import {Fragment} from 'react';
import {Card, Item, ItemSkeleton} from '@shared/ui';
import {textHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';
import {Props} from '../types/List.types.ts';

export function List<R>(props: Props<R>) {
	const {rows, renderRow, isFetching} = props;

	console.log(rows?.length);

	return (
		<>
			{isFetching && <ItemSkeleton />}

			{!isFetching && (
				<Card>
					{!!rows?.length && rows.map((row, index) => <Fragment key={index}>{renderRow(row, index)}</Fragment>)}
					{!rows?.length && (
						<Item name={textHelpers.getDontHaveAny(APP_TEXT.transaction)} isNameText className='text-primary-grey' />
					)}
				</Card>
			)}
		</>
	);
}
