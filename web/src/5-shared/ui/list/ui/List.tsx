import {Fragment} from 'react';
import {Card, Item, ItemSkeleton} from '@shared/ui';
import {ListProps} from '../types/List.types.ts';

export function List<R>(props: ListProps<R>) {
	const {rows, renderRow, isFetching, emptyStateText} = props;

	return (
		<>
			{isFetching && <ItemSkeleton />}

			{!isFetching && (
				<Card>
					{!!rows?.length && rows.map((row, index) => <Fragment key={index}>{renderRow(row, index)}</Fragment>)}
					{!rows?.length && emptyStateText && <Item name={emptyStateText} isNameText className='text-primary-grey' />}
				</Card>
			)}
		</>
	);
}
