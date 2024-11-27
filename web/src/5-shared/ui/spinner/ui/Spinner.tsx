import {cn} from '@shared/lib';

export function Spinner({className, visible = true}: {className?: string; visible?: boolean}) {
	if (!visible) return null;
	return (
		<div className={cn('flex size-4 items-center justify-center', className)}>
			<svg className='animate-spin' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
				<circle
					cx='12'
					cy='12'
					r='10'
					stroke='currentColor'
					strokeWidth='3'
					fill='none'
					strokeLinecap='round'
					strokeDasharray='31.41592653589793' // Длина окружности (2 * pi * r)
					strokeDashoffset='0'
				/>
			</svg>
		</div>
	);
}
