import {ReactNode} from 'react';

import {textHelpers} from '@shared/lib';
import {EmptyState} from '@shared/ui/EmptyState.tsx';
import {APP_TEXT} from '@shared/config';

const {getDontHaveAny} = textHelpers;

type Props<R> = {
	rows: R[];
	renderRow: (row: R) => ReactNode;
};

export function List<R>(props: Props<R>) {
	const {rows, renderRow} = props;

	return (
		<>
			<div className='flex justify-between px-4 py-3 text-sm'>
				<div className='text-primary-grey'>{APP_TEXT.items}</div>
				<div className='text-primary-violet'>{APP_TEXT.seeAll}</div>
			</div>

			<EmptyState text={getDontHaveAny(APP_TEXT.goal)} visible={!rows.length} />

			{rows.map((row) => {
				return renderRow(row);
			})}
		</>
	);
}
