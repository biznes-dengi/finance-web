import {useEffect, useRef} from 'react';
import {Spinner} from '@shared/ui';
import {cn} from '@shared/lib';

export const InfiniteScroll = (props: any) => {
	const {children, fetchNextPage, hasNextPage, isNotInList = false} = props;

	const loaderRef = useRef(null);

	useEffect(() => {
		if (!loaderRef.current) return;

		const observer = new IntersectionObserver(
			(entities: any) => {
				const target = entities[0];

				if (target.isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.5,
			},
		);

		observer.observe(loaderRef.current);

		return () => {
			observer.disconnect();
		};
	}, [children]);

	return (
		<>
			{children}
			{hasNextPage && (
				<div
					ref={loaderRef}
					className={cn('flex items-center justify-center justify-self-center py-4', isNotInList && 'p-0')}
				>
					<Spinner className='text-primary-grey' />
				</div>
			)}
		</>
	);
};
