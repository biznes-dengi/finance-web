import {PreloadSkeleton} from '@shared/ui';
import {LoadingWrapperProps} from '../types/LoadingWrapper.types.ts';

export function LoadingWrapper(props: LoadingWrapperProps) {
	const {isLoading, className, loadingChildren, children} = props;

	if (isLoading) {
		return (
			<div>
				<PreloadSkeleton className={className} />
				{loadingChildren}
			</div>
		);
	}

	return children;
}
