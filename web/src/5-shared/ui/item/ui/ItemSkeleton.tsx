import {PreloadSkeleton} from '@shared/ui';

export function ItemSkeleton({withRightNumbers}: {withRightNumbers?: boolean}) {
	return (
		<div className='rounded-2xl bg-white px-4 py-[18px]'>
			<div className='flex'>
				<PreloadSkeleton width={40} height={40} isCircular />

				<div className='ml-4 flex flex-1 flex-col justify-between py-0.5'>
					<PreloadSkeleton width={128} height={16} />
					<PreloadSkeleton width={64} height={12} />
				</div>

				{withRightNumbers && (
					<div className='flex flex-col items-end justify-between'>
						<PreloadSkeleton width={32} height={16} />
						<PreloadSkeleton width={24} height={12} />
					</div>
				)}
			</div>
		</div>
	);
}
