import {DayPicker} from 'react-day-picker';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {cva} from 'class-variance-authority';
import {DateFieldProps} from '../types/DateField.types.ts';
import {cn, DateService} from '@shared/lib';
import {Button} from '@shared/ui';
import {APP_TEXT} from '@shared/constants';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
	{
		variants: {
			variant: {
				default:
					'bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
				destructive:
					'bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
				outline:
					'bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
				secondary:
					'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
				ghost: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
				link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

// Когда меняем на новую дату ставится дефолтное время. Продумать логику.

export function DateField(props: DateFieldProps) {
	const {value, onChange, minDate} = props;

	return (
		<div className='rounded-2xl bg-white p-2'>
			<div className='mb-2 flex justify-between px-2 text-sm'>
				<div className='text-primary-grey'>{value ? new DateService(value).getLocalDateString() : APP_TEXT.noDate}</div>
				{value && <Button onClick={() => onChange(undefined)}>Reset</Button>}
			</div>
			<DayPicker
				mode='single'
				selected={value}
				onSelect={onChange}
				showOutsideDays={true}
				className={'w-fit'}
				fromDate={minDate}
				classNames={{
					months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
					month: 'space-y-4',
					caption: 'flex justify-center pt-1 relative items-center',
					caption_label: 'text-sm font-medium',
					nav: 'space-x-1 flex items-center',
					nav_button: cn(
						buttonVariants({variant: 'outline'}),
						'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
					),
					nav_button_previous: 'absolute left-1',
					nav_button_next: 'absolute right-1',
					table: 'w-full border-collapse space-y-1',
					head_row: 'flex mb-2',
					head_cell: 'text-neutral-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-neutral-400',
					row: 'flex w-full',
					cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-100/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 dark:[&:has([aria-selected])]:bg-neutral-800',
					day: cn(
						buttonVariants({variant: 'ghost'}),
						'h-8 w-8 font-normal aria-selected:opacity-100 hover:bg-secondary-grey rounded-full',
					),
					day_range_end: 'day-range-end',
					day_selected:
						'!bg-primary-violet !text-white text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900',
					day_today: 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
					day_outside:
						'day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400',
					day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
					day_range_middle:
						'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
					day_hidden: 'invisible',
				}}
				components={{
					IconLeft: ({...props}) => <ChevronLeft className='h-4 w-4' />,
					IconRight: ({...props}) => <ChevronRight className='h-4 w-4' />,
				}}
				ISOWeek
				{...props}
			/>
		</div>
	);
}

DateField.displayName = 'DateField';
