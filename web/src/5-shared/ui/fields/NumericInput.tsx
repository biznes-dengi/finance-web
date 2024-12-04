import {cn} from '@shared/lib';
import {Icon} from '@shared/ui';
import {useRef} from 'react';

type Props = {
	value: number | undefined;
	onChange: (value: number | undefined) => void;
	placeholder?: string;
};

export function NumericInput(props: Props) {
	const {value, onChange, placeholder} = props;

	const inputRef = useRef<HTMLInputElement>(null);

	function handleChange(value: string) {
		onChange(value ? Number(value) : undefined);
	}

	return (
		<>
			<label className='flex items-center rounded-2xl bg-secondary-grey p-4'>
				<input
					ref={inputRef}
					className={cn('w-full bg-inherit caret-primary-violet outline-0')}
					value={value}
					onChange={(event) => handleChange(event.target.value)}
					placeholder={placeholder}
					type='number'
				/>

				{value && (
					<div
						onClick={() => handleChange('')}
						className={cn('ml-2 h-5 w-5 cursor-pointer rounded-full bg-primary-grey p-1 text-secondary-grey')}
					>
						<Icon type='x' className='size-3' />
					</div>
				)}
			</label>
		</>
	);
}
