import {Skeleton as MuiSkeleton} from '@mui/material';
import {cn} from '@shared/lib';

export function PreloadSkeleton(props: {width?: number; height?: number; isCircular?: boolean; className?: string}) {
	const {isCircular, width, height, className} = props;
	return (
		<MuiSkeleton
			variant={isCircular ? 'circular' : 'rectangular'}
			animation='wave'
			width={isCircular && !width ? 40 : width}
			height={isCircular && !height ? 40 : height}
			className={cn('rounded-2xl', className)}
		/>
	);
}
