import {cn} from '@shared/lib';

type Props = {
	className?: string;
	rows: {name: string}[];
	withTopMargin?: boolean;
};

export function List(props: Props) {
	const {rows, className, withTopMargin} = props;

	return (
		<div role='list-wrapper' className={cn('rounded-2xl bg-white', withTopMargin && 'mt-4', className)}>
			{rows.map((row) => (
				<div key={row.name} className='p-1'>
					<div className='mb-0.5 rounded-2xl px-3 py-3 last:mb-0 hover:bg-secondary-grey'>{row.name}</div>
				</div>
			))}
		</div>
	);
}
