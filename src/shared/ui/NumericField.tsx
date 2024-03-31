import {cn, textHelpers} from '@shared/lib';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	currencySymbol?: string;
};

export function NumericField(props: Props) {
	const {value, onChange, placeholder, currencySymbol} = props;

	/** instead of type="number" to see 10 000, not 10000
	 * function handleChange(value: string) {
	 *
	 *
	 *    if (typeof +value === 'number' || value === 'e') {
	 *      onChange(value);
	 *    }
	 *  }
	 * */

	return (
		<div className='relative'>
			<input
				type='number'
				className={cn('w-full rounded-3xl bg-secondary-grey py-3 pl-4 pr-14 outline-0')}
				value={textHelpers.getAmount(value.replace(/\s/g, ''))}
				onChange={(event) => onChange(event.target.value)}
				placeholder={(placeholder || '0') + ` ${currencySymbol}`}
			/>
			<div className='flex items-center'>
				<div className='h-4 w-4 rounded-full bg-primary-blue' />
				<div>{currencySymbol}</div>
			</div>
		</div>
	);
}
