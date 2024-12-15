import {PreloadSkeleton} from '@shared/ui';
import {LoadingWrapperProps} from '../types/LoadingWrapper.types.ts';

export function LoadingWrapper(props: LoadingWrapperProps) {
	const {isLoading, className, loadingChildren, children} = props;

	if (isLoading) {
		return (
			<>
				<PreloadSkeleton className={className} />
				{loadingChildren}
			</>
		);
	}

	return children;
}
