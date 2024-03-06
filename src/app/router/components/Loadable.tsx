import {ElementType, Suspense} from 'react';

export function Loadable(Page: ElementType) {
	//Preload skeleton for a page -? Check documentation what is <Suspense /> for
	return (props: any) => (
		<Suspense fallback={<div>React.Suspense loading...</div>}>
			<Page {...props} />
		</Suspense>
	);
}
