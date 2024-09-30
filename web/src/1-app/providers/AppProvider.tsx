import {QueryClientProvider} from './QueryClientProvider.tsx';
import {RoutingProvider} from './RoutingProvider.tsx';

export function AppProvider() {
	/** useInitialiseApp() */

	return (
		<QueryClientProvider>
			<RoutingProvider />
		</QueryClientProvider>
	);
}
