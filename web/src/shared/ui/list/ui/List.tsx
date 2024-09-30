import {Fragment} from 'react';
import {Box, Item} from '@shared/ui';
import {cn, textHelpers} from '@shared/lib';
import {APP_TEXT} from '@shared/constants';
import {Props} from '../types/List.types.ts';

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

			<Box isCard>
				{rows?.length ? (
					rows.map((row, index) => <Fragment key={index}>{renderRow(row)}</Fragment>)
				) : (
					<Item name={textHelpers.getDontHaveAny(APP_TEXT.goal)} isNameText />
				)}
			</Box>

			{isLoading && <div>isLoading...</div>}
		</>
	);
}
