import {Fragment} from 'react';
import {getEmptyText} from '../lib/List.lib.ts';
import {ListProps} from '../types/List.types.ts';
import {Card, Item, LoadingItem} from '@shared/ui';

export function List<R>(props: ListProps<R>) {
	const {rows, renderRow, isLoading, emptyTextKey} = props;

	if (isLoading) {
		return <LoadingItem withRightName />;
	}

	return (
		<Card>
			{rows?.length ? (
				rows.map((row, index) => <Fragment key={index}>{renderRow(row, index)}</Fragment>)
			) : (
				<Item name={emptyTextKey ? getEmptyText(emptyTextKey) : 'No items'} isNameText className='text-primary-grey' />
			)}
		</Card>
	);
}
