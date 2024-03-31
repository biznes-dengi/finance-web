import {cn} from '@shared/lib';
import {APP_ICON} from '@shared/ui/Icon.tsx';

type Props = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	isSearch?: boolean;
};

export function TextField(props: Props) {
	const {value, onChange, placeholder, maxLength, isSearch} = props;

	function handleChange(value: string) {
		if (maxLength && value.length > maxLength) return;

		onChange(value);
	}

	return (
		<div className='relative'>
			{isSearch && <div className='absolute left-2 top-2 h-4 w-4'>{APP_ICON.search}</div>}
			<input
				className={cn('w-full rounded-3xl bg-secondary-grey py-3 pl-4 pr-14 outline-0', isSearch && 'py-1 pl-8')}
				value={value}
				onChange={(event) => handleChange(event.target.value)}
				placeholder={placeholder}
				type='text'
			/>
			{value && (
				<div
					onClick={() => onChange('')}
					className={cn('absolute right-4 top-[18%] w-fit rounded-full bg-primary-grey p-1 text-secondary-grey')}
				>
					{APP_ICON.reset}
				</div>
			)}
			{maxLength && (
				<div className={cn('mb-2 mr-4 mt-1 flex justify-end text-sm text-primary-grey')}>
					{value.length} / {maxLength}
				</div>
			)}
		</div>
	);
}
