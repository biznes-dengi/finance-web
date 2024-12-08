import {PreloadSkeleton} from '@shared/ui';

export function ItemSkeleton({withRightNumbers}: {withRightNumbers?: boolean}) {
	return (
		<div className='rounded-2xl bg-white px-4 py-[18px]'>
			<div className='flex'>
				<PreloadSkeleton className='size-10' isCircular />

				<div className='ml-4 flex flex-1 flex-col justify-between py-0.5'>
					<PreloadSkeleton className='h-4 w-32' />
					<PreloadSkeleton className='h-3 w-16' />
				</div>

				{withRightNumbers && (
					<div className='flex flex-col items-end justify-between'>
						<PreloadSkeleton className='h-4 w-8' />
						<PreloadSkeleton className='h-3 w-6' />
					</div>
				)}
			</div>
		</div>
	);
}
