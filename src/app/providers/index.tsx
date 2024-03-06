import {ReactNode} from 'react';

import {RoutingProvider} from '@app/providers/RoutingProvider.tsx';
import {QueryClientProvider} from '@app/providers/QueryClientProvider.tsx';

export function AppProvider({children}: {children: ReactNode}) {
	return (
		<RoutingProvider>
			<QueryClientProvider>{children}</QueryClientProvider>
		</RoutingProvider>
	);
}
