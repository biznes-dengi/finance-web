import {Fragment} from 'react';
import {getEmptyText} from '../lib/List.lib.ts';
import {ListProps} from '../types/List.types.ts';
import {Card, Item, LoadingItem} from '@shared/ui';
import {InfiniteScroll} from '@shared/lib';

export function List<R>(props: ListProps<R>) {
	const {items, renderItem, isLoading, emptyTextKey, fetchNextPage, hasNextPage} = props;

	if (isLoading) {
		return <LoadingItem withRightName />;
	}

	return (
		<Card>
			<InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
				{items?.length ? (
					items.map((row, index) => <Fragment key={index}>{renderItem(row, index)}</Fragment>)
				) : (
					<Item
						name={emptyTextKey ? getEmptyText(emptyTextKey) : 'No items'}
						isNameText
						className='text-primary-grey'
					/>
				)}
			</InfiniteScroll>
		</Card>
	);
}
