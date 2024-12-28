import {useEffect, useRef} from 'react';
import {Spinner} from '@shared/ui';

export const InfiniteScroll = (props: any) => {
	const {children, fetchNextPage, hasNextPage} = props;

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
				rootMargin: '20px',
				threshold: 1.0,
			},
		);

		observer.observe(loaderRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div>
			<div>{children}</div>

			{hasNextPage && (
				<div ref={loaderRef} className='flex items-center justify-center justify-self-center py-4'>
					<Spinner className='text-primary-grey' />
				</div>
			)}
		</div>
	);
};
